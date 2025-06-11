const StudyPlan = require('../models/StudyPlan');
const { google } = require('googleapis');
const mongoose = require('mongoose');

const generatePlan = async (req, res) => {
  const { subjects, goals, hours, mood, startDate, endDate } = req.body;
  const userId = req.user ? req.user.id : null;

  if (!userId) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  if (!subjects || !goals || !hours || !startDate || !endDate) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  if (daysDiff <= 0) {
    return res.status(400).json({ success: false, error: 'End date must be after start date' });
  }

  const subjectsArray = subjects.split(',').map(s => s.trim());
  const plan = [];
  const hoursPerDay = parseInt(hours);

  for (let i = 0; i < daysDiff; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);

    const subject = subjectsArray[i % subjectsArray.length];
    const duration = `${hoursPerDay} hours`;
    const task = `Study ${subject} for ${hoursPerDay} hours`;

    plan.push({
      date: currentDate,
      subject,
      duration,
      task,
      completed: false
    });
  }

  const studyPlan = new StudyPlan({
    userId,
    title: `Study Plan for ${subjects}`,
    subjects: subjectsArray,
    goals,
    dailyHours: hoursPerDay,
    mood,
    startDate: start,
    endDate: end,
    plan,
    syncedToCalendar: false,
    calendarEventIds: [],
    createdAt: new Date(),
    updatedAt: new Date()
  });

  await studyPlan.save();

  res.status(200).json({ 
    success: true, 
    data: { 
      plan: plan.map(item => ({
        ...item,
        date: item.date.toISOString().split('T')[0]
      })),
      planId: studyPlan._id // Include planId in the response
    } 
  });
};

const getPlans = async (req, res) => {
  const userId = req.user ? req.user.id : null;
  if (!userId) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const plans = await StudyPlan.find({ userId });
  res.status(200).json({ success: true, data: plans });
};

const updatePlan = async (req, res) => {
  const { id } = req.params;
  const userId = req.user ? req.user.id : null;

  if (!userId) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: 'Invalid plan ID' });
  }

  const plan = await StudyPlan.findOne({ _id: id, userId });
  if (!plan) {
    return res.status(404).json({ success: false, error: 'Plan not found' });
  }

  const updates = req.body;
  Object.assign(plan, updates, { updatedAt: new Date() });
  await plan.save();

  res.status(200).json({ success: true, data: plan });
};

module.exports = { generatePlan, getPlans, updatePlan };