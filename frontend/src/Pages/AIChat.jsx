"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Bot, User, Star, Zap, MessageCircle } from "lucide-react"
import "../styles/home.css"

const AIChat = () => {
  const [stars, setStars] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Welcome to the cosmic chat, space explorer! I'm your AI study buddy. How can I help you conquer the universe of knowledge today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showMotivation, setShowMotivation] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 80 }, (_, i) => ({
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

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Great question! Let me break that down for you in cosmic terms... ✨",
        "Ah, I see you're exploring the mysteries of the universe! Here's what I know... 🚀",
        "That's a stellar question, cosmic hero! Let me illuminate the path... 🌟",
        "Excellent! You're really pushing the boundaries of knowledge... 💫",
      ]

      const aiMessage = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const triggerMotivation = () => {
    setShowMotivation(true)
    setTimeout(() => setShowMotivation(false), 3000)
  }

  // Floating particles
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
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
      <div className="relative z-10 pt-24 pb-4 h-screen flex flex-col">
        {/* Header */}
        <div className="text-center mb-6 px-4">
          <div className="flex justify-center mb-4">
            <MessageCircle className="w-12 h-12 text-cyan-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-orbitron mb-2">
            Cosmic AI Chat
          </h1>
          <p className="text-gray-300">Your intelligent study companion across the cosmos</p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 px-4">
          <div className="chat-container h-full">
            {/* Chat Messages */}
            <div
              className="chat-main cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/10 flex flex-col h-full"
              style={{
                transform: `perspective(1000px) rotateY(${-mousePosition.x * 0.005}deg)`,
              }}
            >
              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                          : "bg-slate-700/50 text-gray-100 border border-purple-400/30"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === "ai" && <Bot className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />}
                        {message.type === "user" && <User className="w-5 h-5 text-cyan-200 mt-0.5 flex-shrink-0" />}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-slate-700/50 border border-purple-400/30 px-4 py-3 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-purple-400" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-600/30">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your cosmic studies..."
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                      rows={2}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim()}
                    className="cosmic-button bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-3 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat History Sidebar */}
            <div
              className="chat-sidebar cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-6 border border-purple-400/30 shadow-2xl shadow-purple-500/10"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 0.005}deg)`,
              }}
            >
              <h3 className="text-xl font-bold text-white mb-4 font-orbitron flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-400" />
                Chat History
              </h3>

              <div className="space-y-3 mb-6">
                {[
                  "Math: Quadratic Equations",
                  "Chemistry: Atomic Structure",
                  "Physics: Newton's Laws",
                  "Biology: Cell Division",
                ].map((topic, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/30 rounded-xl p-3 border border-gray-600/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
                  >
                    <p className="text-gray-300 text-sm">{topic}</p>
                    <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
                  </div>
                ))}
              </div>

              <button
                onClick={triggerMotivation}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Motivation Blast
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Motivation Blast Animation */}
      {showMotivation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-bounce-slow">
            <div className="bg-gradient-to-r from-yellow-500/90 to-orange-500/90 rounded-full px-8 py-4 border-2 border-yellow-400 shadow-2xl shadow-yellow-500/50">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-white animate-spin" fill="white" />
                <span className="text-white font-bold text-xl font-orbitron">
                  Keep exploring the cosmic knowledge! 🌌
                </span>
                <Star className="w-8 h-8 text-white animate-spin-reverse" fill="white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIChat
