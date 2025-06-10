const StudyPlan = require('../models/StudyPlan');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatePlan = async (req, res) => {
  const { subjects, goals, hours, mood } = req.body;
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    if (!subjects || typeof subjects !== 'string') {
      return res.status(400).json({ success: false, error: 'Subjects must be a comma-separated string' });
    }
    if (!goals || typeof goals !== 'string') {
      return res.status(400).json({ success: false, error: 'Goals must be a string' });
    }
    if (!hours || typeof hours !== 'number' || hours <= 0) {
      return res.status(400).json({ success: false, error: 'Hours must be a positive number' });
    }
    if (!mood || typeof mood !== 'string') {
      return res.status(400).json({ success: false, error: 'Mood must be a string' });
    }

    let days = 7;
    const daysMatch = goals.match(/in (\d+) days/i);
    if (daysMatch) {
      days = parseInt(daysMatch[1]);
      if (days < 1) days = 1;
      if (days > 7) days = 7;
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `Create a ${days}-day study plan for subjects: ${subjects}, goals: ${goals}, daily hours: ${hours}, mood: ${mood}. Return a JSON array of objects, each containing "day" (as a number from 1 to ${days}), "subject" (string), "duration" (string, e.g., "1 hr"), and "task" (string, concise task description). Example: [{"day": 1, "subject": "Math", "duration": "1 hr", "task": "Practice algebra"}]`;

    const result = await model.generateContent(prompt);
    let planText = result.response.text();
    console.log('Gemini API Response:', planText);

    planText = planText.replace(/```json\n|\n```/g, '').trim();

    let plan;
    try {
      plan = JSON.parse(planText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      return res.status(500).json({ success: false, error: 'Failed to parse study plan from AI response' });
    }

    if (!Array.isArray(plan)) {
      return res.status(500).json({ success: false, error: 'AI response must be an array of plan items' });
    }

    const dayMap = {
      'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4,
      'friday': 5, 'saturday': 6, 'sunday': 7,
    };
    const validatedPlan = plan.map(item => {
      if (!item.day || !item.subject || !item.duration || !item.task) {
        throw new Error('Each plan item must have day, subject, duration, and task');
      }
      let dayValue = item.day;
      if (typeof dayValue === 'string') {
        dayValue = dayMap[dayValue.toLowerCase()] || parseInt(dayValue);
      }
      if (isNaN(dayValue) || dayValue < 1 || dayValue > days) {
        throw new Error(`Invalid day value: ${item.day}`);
      }
      return {
        day: dayValue,
        subject: item.subject,
        duration: item.duration,
        task: item.task,
        completed: false,
      };
    });

    const subjectsArray = subjects.split(',').map(s => s.trim());

    const newPlan = new StudyPlan({
      userId: req.user.id,
      title: `${subjects} Study Plan`,
      subjects: subjectsArray,
      goals,
      dailyHours: hours,
      mood,
      plan: validatedPlan,
      syncedToCalendar: false,
      calendarEventIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newPlan.save();

    res.json({ success: true, data: { plan: validatedPlan } });
  } catch (error) {
    console.error('Error in generatePlan:', error.message, error.stack);
    res.status(500).json({ success: false, error: `Failed to generate plan: ${error.message}` });
  }
};

const getPlans = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }
    const plans = await StudyPlan.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: plans });
  } catch (error) {
    console.error('Error in getPlans:', error.message, error.stack);
    res.status(500).json({ success: false, error: 'Failed to fetch plans: ' + error.message });
  }
};

const updatePlan = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }
    const updatedPlan = await StudyPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedPlan) {
      return res.status(404).json({ success: false, error: 'Plan not found' });
    }
    res.json({ success: true, data: updatedPlan });
  } catch (error) {
    console.error('Error in updatePlan:', error.message, error.stack);
    res.status(500).json({ success: false, error: 'Failed to update plan: ' + error.message });
  }
};

module.exports = { generatePlan, getPlans, updatePlan };