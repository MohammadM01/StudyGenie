const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const StudyPlan = require('../models/StudyPlan');

const credentialsPath = path.join(__dirname, '../config/google-credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
const { client_id, client_secret, redirect_uris } = credentials.web;

// Explicitly configure the OAuth client as a confidential client
const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0], {
  usePKCE: false, // Attempt to disable PKCE (may depend on library version)
});

const scopes = ['https://www.googleapis.com/auth/calendar'];

const getAuthUrl = (userId, planId) => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: JSON.stringify({ userId, planId }),
    prompt: 'consent', // Ensure a refresh token is returned
    include_granted_scopes: true,
  });
};

const setCredentials = async (code) => {
  try {
    // Use the library's method, relying on the usePKCE: false setting
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Tokens successfully retrieved:', tokens); // Debug log
    return tokens;
  } catch (error) {
    console.error('Error in setCredentials:', error.response ? error.response.data : error.message);
    throw new Error('Failed to exchange code for tokens: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
  }
};

const syncToCalendar = async (userId, planId, tokens) => {
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