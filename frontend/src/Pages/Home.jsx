"use client"

import { useState, useEffect } from "react"
import { Calendar, Brain, Zap, Sparkles, Star, Rocket } from "lucide-react"

const Home = () => {
  const [stars, setStars] = useState([])

  useEffect(() => {
    // Generate random stars for background
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
    }))
    setStars(newStars)
  }, [])

  const features = [
    {
      icon: <Calendar className="w-12 h-12 text-white" />,
      title: "Personalized Study Plans",
      description: "Crafted for your subjects and goals, synced to Google Calendar",
      bgColor: "bg-cyan-500",
      borderColor: "border-cyan-400",
    },
    {
      icon: <Brain className="w-12 h-12 text-white" />,
      title: "Instant Doubt Solver",
      description: "Ask any question, get step-by-step answers from our AI",
      bgColor: "bg-pink-500",
      borderColor: "border-pink-400",
    },
    {
      icon: <Zap className="w-12 h-12 text-white" />,
      title: "Quick Quiz Engine",
      description: "Test yourself with tailored quizzes and instant feedback",
      bgColor: "bg-yellow-500",
      borderColor: "border-yellow-400",
    },
    {
      icon: <Sparkles className="w-12 h-12 text-white" />,
      title: "Mood-Based Tips",
      description: "Uplifting advice tuned to your vibe—Energized, Stressed, or Epic Quest Mode!",
      bgColor: "bg-green-500",
      borderColor: "border-green-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden w-screen">
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center px-4 mb-16">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Welcome to StudyGenie!
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-4xl font-bold text-cyan-300 mb-8">Your AI-Powered Study Buddy!</h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Embark on a Cosmic Learning Quest with Personalized Plans, Quizzes, and More!
          </p>

          {/* Info Box */}
          <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-400/30 mb-16">
            <p className="text-gray-200 text-lg leading-relaxed">
              StudyGenie uses <span className="text-cyan-400 font-semibold">Google Gemini AI</span> to deliver custom
              study plans, instant doubt solutions, quick quizzes, and mood-based tips—synced to your{" "}
              <span className="text-purple-400 font-semibold">Google Calendar</span> for stellar results!
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">Cosmic Features</h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 transform text-center"
              >
                {/* Feature Icon */}
                <div
                  className={`w-20 h-20 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                {/* Feature Title */}
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>

                {/* Feature Description */}
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Central Cosmic Visual */}
        <div className="flex justify-center mb-20">
          <div className="relative">
            {/* Outer Dashed Ring */}
            <div
              className="w-80 h-80 rounded-full border-2 border-dashed border-purple-400/60 animate-spin"
              style={{ animationDuration: "20s" }}
            >
              {/* Inner Central Star */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50">
                  <Star className="w-16 h-16 text-white" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivation Quote */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full px-8 py-4 border border-yellow-400/40">
            <Star className="w-6 h-6 text-yellow-400 animate-spin" fill="currentColor" />
            <span className="text-yellow-300 font-bold text-lg">"Slay that math dragon, cosmic hero!"</span>
            <Star
              className="w-6 h-6 text-yellow-400 animate-spin"
              fill="currentColor"
              style={{ animationDirection: "reverse" }}
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-8">
          <button className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-110 shadow-2xl shadow-cyan-500/30">
            <span className="flex items-center gap-3">
              <Rocket className="w-6 h-6 group-hover:animate-bounce" />
              Login to Launch
              <Rocket className="w-6 h-6 group-hover:animate-bounce" />
            </span>
          </button>

          <p className="text-gray-400 mt-4 text-lg">Ready to begin your cosmic learning adventure?</p>
        </div>
      </div>
    </div>
  )
}

export default Home
