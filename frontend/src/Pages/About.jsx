"use client"

import { useState, useEffect } from "react"
import { Rocket, Star, Sparkles, Zap, Brain, Calendar, Users, Target, Heart, Globe } from "lucide-react"
import "../styles/home.css"

const About = () => {
  const [stars, setStars] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 150 }, (_, i) => ({
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
  }, [])

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Harness the power of Google Gemini AI for personalized study experiences",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Scheduling",
      description: "Seamlessly sync your study plans with Google Calendar for optimal time management",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Feedback",
      description: "Get immediate answers to your questions and real-time quiz results",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Mood-Based Learning",
      description: "Adaptive content that matches your energy levels and learning style",
      color: "from-green-400 to-teal-500",
    },
  ]

  const teamMembers = [
    {
      name: "Cosmic Explorer Alpha",
      role: "AI Architect",
      description: "Masters the art of cosmic AI integration",
      avatar: "🚀",
    },
    {
      name: "Stellar Developer Beta",
      role: "Frontend Wizard",
      description: "Crafts beautiful cosmic user experiences",
      avatar: "⭐",
    },
    {
      name: "Galaxy Designer Gamma",
      role: "UX Astronaut",
      description: "Designs intuitive cosmic interfaces",
      avatar: "🌌",
    },
    {
      name: "Nebula Engineer Delta",
      role: "Backend Specialist",
      description: "Builds robust cosmic infrastructure",
      avatar: "💫",
    },
  ]

  const stats = [
    { number: "10K+", label: "Cosmic Learners", icon: <Users className="w-6 h-6" /> },
    { number: "50K+", label: "Quizzes Completed", icon: <Brain className="w-6 h-6" /> },
    { number: "100K+", label: "Study Hours", icon: <Target className="w-6 h-6" /> },
    { number: "99%", label: "Satisfaction Rate", icon: <Heart className="w-6 h-6" /> },
  ]

  // Floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Animated Stars */}
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

      {/* Floating Particles */}
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

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-16 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center animate-float">
                <Rocket className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -inset-8 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-orbitron mb-6 animate-glow">
            About StudyGenie
          </h1>

          <p className="text-xl md:text-2xl text-cyan-300 mb-8 max-w-4xl mx-auto animate-fade-in-up">
            Embark on a cosmic journey through the universe of knowledge with your AI-powered study companion
          </p>

          <div
            className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 max-w-5xl mx-auto border border-cyan-400/30 animate-slide-up cosmic-card"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">Our Cosmic Mission</h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              StudyGenie was born from a vision to revolutionize learning through the power of artificial intelligence
              and cosmic inspiration. We believe that every student is a cosmic explorer, ready to discover new worlds
              of knowledge. Our platform combines cutting-edge AI technology with an engaging, space-themed experience
              to make learning not just effective, but truly magical.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-white mb-12 font-orbitron animate-glow">Cosmic Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-cyan-400/30 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-cyan-400 mb-2 font-orbitron">{stat.number}</div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-white mb-12 font-orbitron animate-glow">
            Cosmic Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-orbitron">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-white mb-12 font-orbitron animate-glow">Cosmic Crew</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-6 border border-purple-400/30 text-center animate-fade-in-up hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-lg font-bold text-white mb-2 font-orbitron">{member.name}</h3>
                <p className="text-cyan-400 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-20">
          <div
            className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 max-w-5xl mx-auto border border-purple-400/30 animate-fade-in-up"
            style={{
              transform: `perspective(1000px) rotateX(${-mousePosition.y * 0.02}deg) rotateY(${-mousePosition.x * 0.02}deg)`,
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 font-orbitron text-center">
              Powered by Cosmic Technology
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Google Gemini AI</h3>
                <p className="text-gray-300 text-sm">Advanced AI for personalized learning experiences</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Google Calendar</h3>
                <p className="text-gray-300 text-sm">Seamless integration for study scheduling</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Modern Web Tech</h3>
                <p className="text-gray-300 text-sm">Built with React, Node.js, and cutting-edge tools</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center animate-pulse-slow">
              <Star className="w-16 h-16 text-white" fill="white" />
            </div>
            <div className="absolute -inset-8 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6 font-orbitron">Our Cosmic Vision</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We envision a future where learning transcends traditional boundaries, where every student can explore the
            infinite cosmos of knowledge with confidence, creativity, and cosmic wonder. Together, we're not just
            studying—we're pioneering the future of education, one cosmic adventure at a time.
          </p>

          <div className="mt-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-8 py-4 border border-cyan-400/30 animate-float-slow">
              <Sparkles className="w-6 h-6 text-cyan-400 animate-spin-slow" />
              <span className="text-cyan-300 font-bold text-lg font-orbitron">
                "Ready to join the cosmic learning revolution?"
              </span>
              <Sparkles className="w-6 h-6 text-purple-400 animate-spin-reverse-slow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
