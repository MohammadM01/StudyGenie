"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar, BookOpen, Target, Clock, Sparkles, Star, Rocket, Zap } from "lucide-react"
import "../styles/home.css"

const Study = () => {
  const [stars, setStars] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    subjects: "",
    goals: "",
    studyHours: "",
    mood: "energized",
    startDate: "",
    endDate: "",
  })
  const [studyPlan, setStudyPlan] = useState(null)
  const [planId, setPlanId] = useState(null) // New state to store planId
  const [isGenerating, setIsGenerating] = useState(false)
  const [showMotivation, setShowMotivation] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    }

    const newStars = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      blinkDelay: Math.random() * 5,
    }))
    setStars(newStars)

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [navigate])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const generateStudyPlan = async () => {
    if (!formData.startDate || !formData.endDate) {
      alert("Please select a start and end date for your study plan.")
      return
    }

    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)
    if (start > end) {
      alert("Start date must be before end date.")
      return
    }

    setIsGenerating(true)
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please log in to generate a study plan")
      setIsGenerating(false)
      navigate("/login")
      return
    }
    try {
      const response = await fetch("http://localhost:3001/api/study/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          subjects: formData.subjects,
          goals: formData.goals,
          hours: parseInt(formData.studyHours),
          mood: formData.mood,
          startDate: formData.startDate,
          endDate: formData.endDate,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setStudyPlan(data.data.plan)
        setPlanId(data.data.planId) // Store the planId from the backend response
      } else {
        alert("Failed to generate study plan: " + data.error)
      }
    } catch (error) {
      alert("Error generating study plan: " + error.message)
    }
    setIsGenerating(false)
  }

  const syncToCalendar = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please log in to sync with Google Calendar")
      navigate("/login")
      return
    }

    if (!planId) {
      alert("No study plan available to sync. Please generate a plan first.")
      return
    }

    try {
      const response = await fetch(`http://localhost:3001/api/study/auth?planId=${planId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        window.location.href = data.authUrl // Redirect to Google OAuth
      } else {
        alert("Failed to initiate Google Calendar sync: " + data.error)
      }
    } catch (error) {
      alert("Error initiating Google Calendar sync: " + error.message)
    }
  }

  const triggerMotivation = () => {
    setShowMotivation(true)
    setTimeout(() => setShowMotivation(false), 3000)
  }

  const motivationQuotes = {
    energized: "Blast through those concepts like a cosmic rocket! 🚀",
    stressed: "Take it one star at a time, cosmic warrior! ⭐",
    epic: "Slay that math dragon, legendary hero! 🐉",
  }

  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="fixed inset-0 z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.blinkDelay}s`,
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl animate-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-21">
        <div className="text-center">
          <div className="flex justify-center">
            <BookOpen className="w-10 h-10 text-cyan-400 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-orbitron pb-1">
            Smart Study Planner
          </h1>
        </div>

        <div className="page-container">
          <div className="content-wrapper">
            <div className="centered-grid two-column">
              <div
                className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-7 border border-cyan-400/30 shadow-2xl shadow-cyan-500/10 w-full max-w-lg"
                style={{
                  transform: `perspective(1000px) rotateY(${-mousePosition.x * 0.01}deg)`,
                }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 font-orbitron flex items-center gap-3">
                  <Target className="w-6 h-6 text-cyan-400" />
                  Plan Your Journey
                </h2>

                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      Subjects
                    </label>
                    <input
                      type="text"
                      name="subjects"
                      value={formData.subjects}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      placeholder="e.g., Math, Science, History"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      Goals
                    </label>
                    <textarea
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none"
                      placeholder="e.g., Master algebra in 2 days, Prepare for chemistry exam"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      Daily Study Hours
                    </label>
                    <select
                      name="studyHours"
                      value={formData.studyHours}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                    >
                      <option value="">Select hours</option>
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4+ hours</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-400" />
                      Current Mood
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "energized", label: "Energized", color: "from-green-500 to-teal-500" },
                        { value: "stressed", label: "Stressed", color: "from-orange-500 to-red-500" },
                        { value: "epic", label: "Epic Quest", color: "from-purple-500 to-pink-500" },
                      ].map((mood) => (
                        <button
                          key={mood.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, mood: mood.value })}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm ${
                            formData.mood === mood.value
                              ? `border-cyan-400 bg-gradient-to-r ${mood.color} text-white`
                              : "border-gray-600 bg-slate-700/50 text-gray-300 hover:border-gray-500"
                          }`}
                        >
                          {mood.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={generateStudyPlan}
                    disabled={isGenerating}
                    className="w-full cosmic-button bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 font-orbitron disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Generating Plan...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Rocket className="w-5 h-5" />
                        Generate Cosmic Plan
                      </span>
                    )}
                  </button>
                </form>
              </div>

              <div
                className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-purple-400/30 shadow-2xl shadow-purple-500/10 w-full max-w-lg"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 0.01}deg)`,
                }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 font-orbitron flex items-center gap-3">
                  <Star className="w-6 h-6 text-purple-400" />
                  Your Cosmic Study Plan
                </h2>

                {studyPlan ? (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {studyPlan.map((item, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/30 rounded-xl p-4 border border-gray-600/30 hover:border-purple-400/50 transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-purple-400 font-semibold">{item.date}</span>
                          <span className="text-cyan-400 text-sm">{item.duration}</span>
                        </div>
                        <h3 className="text-white font-medium mb-1">{item.subject}</h3>
                        <p className="text-gray-300 text-sm">{item.task}</p>
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={syncToCalendar}
                        className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-green-400 hover:to-teal-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-5 h-5" />
                        Sync to Calendar
                      </button>
                      <button
                        onClick={triggerMotivation}
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <Zap className="w-5 h-5" />
                        Motivation Blast
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                      <Star className="w-12 h-12 text-purple-400 animate-pulse" />
                    </div>
                    <p className="text-gray-400">Fill out the form to generate your personalized study plan</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMotivation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-bounce-slow">
            <div className="bg-gradient-to-r from-yellow-500/90 to-orange-500/90 rounded-full px-8 py-4 border-2 border-yellow-400 shadow-2xl shadow-yellow-500/50">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-white animate-spin" fill="white" />
                <span className="text-white font-bold text-xl font-orbitron">{motivationQuotes[formData.mood]}</span>
                <Star className="w-8 h-8 text-white animate-spin-reverse" fill="white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Study