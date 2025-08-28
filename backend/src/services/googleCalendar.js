const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const StudyPlan = require('../models/StudyPlan');

// Look for google-credentials.json in two likely locations:
// - backend/config/google-credentials.json
// - backend/src/config/google-credentials.json (legacy)
const candidatePaths = [
  path.join(__dirname, '..', '..', 'config', 'google-credentials.json'),
  path.join(__dirname, '..', 'config', 'google-credentials.json'),
];

let client_id, client_secret, redirect_uris;
let credentialsRead = false;
for (const p of candidatePaths) {
  try {
    if (!fs.existsSync(p)) continue;
    const raw = fs.readFileSync(p, 'utf8');
    if (!raw || !raw.trim()) throw new Error('Empty credentials file');
    const credentials = JSON.parse(raw);
    if (credentials && credentials.web) {
      client_id = credentials.web.client_id;
      client_secret = credentials.web.client_secret;
      redirect_uris = credentials.web.redirect_uris;
      credentialsRead = true;
      break;
    }
  } catch (err) {
    console.warn(`Warning: unable to read/parse google credentials at ${p}: ${err.message}`);
    // try next candidate
  }
}

if (!credentialsRead) {
  // Fall back to environment variables
  client_id = process.env.GOOGLE_CLIENT_ID || client_id;
  client_secret = process.env.GOOGLE_CLIENT_SECRET || client_secret;
  const redirect = process.env.GOOGLE_REDIRECT_URI || process.env.GOOGLE_REDIRECT_URLS;
  redirect_uris = redirect ? (Array.isArray(redirect) ? redirect : [redirect]) : redirect_uris;
}

let oauth2Client = null;
if (client_id && client_secret && Array.isArray(redirect_uris) && redirect_uris.length) {
  // Configure the OAuth client when credentials are available
  oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
} else {
  console.warn('Google OAuth credentials not configured. Google Calendar features will be disabled until credentials are provided.');
}

const scopes = ['https://www.googleapis.com/auth/calendar'];

const getAuthUrl = (userId, planId) => {
  if (!oauth2Client) throw new Error('Google OAuth client not configured. Cannot generate auth URL.');
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: JSON.stringify({ userId, planId }),
    prompt: 'consent', // Ensure a refresh token is returned
    include_granted_scopes: true,
  });
};

const setCredentials = async (code) => {
  if (!oauth2Client) throw new Error('Google OAuth client not configured. Cannot exchange code for tokens.');
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Tokens successfully retrieved:', tokens);
    return tokens;
  } catch (error) {
    console.error('Error in setCredentials:', error.response ? error.response.data : error.message);
    throw new Error('Failed to exchange code for tokens: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
  }
};

const syncToCalendar = async (userId, planId, tokens) => {
  if (!oauth2Client) throw new Error('Google OAuth client not configured. Cannot sync to calendar.');
  oauth2Client.setCredentials(tokens);

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const plan = await StudyPlan.findOne({ _id: planId, userId });

  if (!plan) {
    throw new Error('Study plan not found');
  }

  const eventIds = [];

  for (const item of plan.plan) {
    const eventDate = new Date(item.date);

    const event = {
      summary: `${item.subject} Study Session`,
      description: item.task,
      start: {
        date: eventDate.toISOString().split('T')[0], // All-day event
        timeZone: 'Asia/Kolkata',
      },
      end: {
        date: new Date(eventDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next day
        timeZone: 'Asia/Kolkata',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // Reminder 1 day before
          { method: 'popup', minutes: 24 * 60 }, // Reminder 1 day before (popup for all-day events)
        ],
      },
    };

    try {
      const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      eventIds.push(response.data.id);
      console.log(`Event created: ${item.subject} on ${eventDate.toISOString().split('T')[0]}`);
    } catch (error) {
      console.error('Error creating calendar event:', error.response ? error.response.data : error.message);
      throw new Error('Failed to sync some events to Google Calendar: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
    }
  }

  plan.syncedToCalendar = true;
  plan.calendarEventIds = eventIds;
  await plan.save();

  return eventIds;
};

module.exports = { getAuthUrl, setCredentials, syncToCalendar };