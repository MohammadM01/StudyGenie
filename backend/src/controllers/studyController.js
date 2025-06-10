const StudyPlan = require('../models/StudyPlan');
  const { GoogleGenerativeAI } = require('@google/generative-ai');

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const generatePlan = async (req, res) => {
    const { subjects, goals, hours, mood } = req.body;
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `Create a 7-day study plan for subjects: ${subjects}, goals: ${goals}, daily hours: ${hours}, mood: ${mood}. Return JSON with day, subject, duration, and task.`;
      const result = await model.generateContent(prompt);
      const plan = JSON.parse(result.response.text());

      const newPlan = new StudyPlan({
        userId: req.user.id,
        title: `${subjects} Study Plan`,
        subjects,
        goals,
        dailyHours: hours,
        mood,
        plan: plan,
        syncedToCalendar: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await newPlan.save();
      res.json({ success: true, data: newPlan });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to generate plan' });
    }
  };

  const getPlans = async (req, res) => {
    try {
      const plans = await StudyPlan.find({ userId: req.user.id });
      res.json({ success: true, data: plans });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  };

  const updatePlan = async (req, res) => {
    try {
      const updatedPlan = await StudyPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ success: true, data: updatedPlan });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  };

  module.exports = { generatePlan, getPlans, updatePlan };