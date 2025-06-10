"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Send, MessageCircle, Star, Rocket, Zap, Globe, Clock, Users } from "lucide-react"
import "../styles/home.css"

const Contact = () => {
  const [stars, setStars] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // Generate random stars
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
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        type: "general",
      })
      setTimeout(() => setShowSuccess(false), 5000)
    }, 2000)
  }

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Cosmic Email",
      description: "Send us a message through the cosmic void",
      value: "hello@studygenie.com",
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with our cosmic support team",
      value: "Available 24/7",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Cosmic Hotline",
      description: "Call us for urgent cosmic assistance",
      value: "+1 (555) COSMIC",
      color: "from-green-400 to-teal-500",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Cosmic HQ",
      description: "Visit our headquarters in the galaxy",
      value: "123 Cosmic Way, Universe City",
      color: "from-yellow-400 to-orange-500",
    },
  ]

  const supportOptions = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Technical Support",
      description: "Get help with technical issues and bugs",
      responseTime: "< 2 hours",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "General Inquiries",
      description: "Questions about features and usage",
      responseTime: "< 4 hours",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Feature Requests",
      description: "Suggest new cosmic features",
      responseTime: "< 24 hours",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Partnership",
      description: "Business and partnership opportunities",
      responseTime: "< 48 hours",
    },
  ]

  const socialLinks = [
    { name: "Twitter", icon: "🐦", url: "#", color: "from-blue-400 to-cyan-400" },
    { name: "Discord", icon: "💬", url: "#", color: "from-purple-400 to-indigo-400" },
    { name: "GitHub", icon: "🚀", url: "#", color: "from-gray-400 to-slate-400" },
    { name: "LinkedIn", icon: "💼", url: "#", color: "from-blue-500 to-blue-600" },
  ]

  // Floating particles
  const particles = Array.from({ length: 10 }, (_, i) => ({
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
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center animate-float">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -inset-6 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-orbitron mb-6 animate-glow">
            Contact Mission Control
          </h1>

          <p className="text-xl md:text-2xl text-cyan-300 mb-8 max-w-4xl mx-auto animate-fade-in-up">
            Ready to connect across the cosmic void? Our space crew is here to help!
          </p>
        </div>

        {/* Contact Methods */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12 font-orbitron">
            Cosmic Communication Channels
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-500 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center mx-auto mb-4`}
                >
                  {method.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-orbitron">{method.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{method.description}</p>
                <p className="text-cyan-400 font-semibold">{method.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div
              className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-cyan-400/30 shadow-2xl shadow-cyan-500/10"
              style={{
                transform: `perspective(1000px) rotateY(${-mousePosition.x * 0.01}deg)`,
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron flex items-center gap-3">
                <Send className="w-6 h-6 text-cyan-400" />
                Send Cosmic Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Cosmic Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="Enter your cosmic identity"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Cosmic Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="your.email@cosmos.com"
                    required
                  />
                </div>

                {/* Message Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Message Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="feature">Feature Request</option>
                    <option value="partnership">Partnership</option>
                    <option value="bug">Bug Report</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="What's your cosmic message about?"
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Cosmic Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                    placeholder="Share your thoughts from across the cosmos..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cosmic-button bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 font-orbitron disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Transmitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Rocket className="w-5 h-5" />
                      Launch Message
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* Support Options */}
            <div className="space-y-8">
              <div
                className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-purple-400/30 shadow-2xl shadow-purple-500/10"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 0.01}deg)`,
                }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 font-orbitron flex items-center gap-3">
                  <Star className="w-6 h-6 text-purple-400" />
                  Support Galaxy
                </h2>

                <div className="space-y-4">
                  {supportOptions.map((option, index) => (
                    <div
                      key={index}
                      className="bg-slate-700/30 rounded-xl p-4 border border-gray-600/30 hover:border-purple-400/50 transition-all duration-300 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{option.title}</h3>
                          <p className="text-gray-300 text-sm mb-2">{option.description}</p>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-400 text-sm font-medium">{option.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-green-400/30 shadow-2xl shadow-green-500/10">
                <h3 className="text-xl font-bold text-white mb-6 font-orbitron text-center">
                  Join Our Cosmic Community
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`cosmic-button bg-gradient-to-r ${social.color} text-white font-semibold py-3 px-4 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}
                    >
                      <span className="text-lg">{social.icon}</span>
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12 font-orbitron">Cosmic FAQ</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "How quickly do you respond to cosmic messages?",
                answer: "Our cosmic crew typically responds within 2-24 hours depending on the type of inquiry!",
              },
              {
                question: "Can I schedule a cosmic consultation?",
                answer: "Reach out via email and we'll arrange a time to explore the cosmos together.",
              },
              {
                question: "Do you offer cosmic support in multiple languages?",
                answer: "Currently we support English, but we're expanding to cover more cosmic languages soon!",
              },
              {
                question: "How can I report a cosmic bug?",
                answer: "Use our contact form with 'Bug Report' selected, or email us directly with details!",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-bold text-cyan-400 mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-bounce-slow">
            <div className="bg-gradient-to-r from-green-500/90 to-teal-500/90 rounded-full px-8 py-4 border-2 border-green-400 shadow-2xl shadow-green-500/50">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-white animate-spin" fill="white" />
                <span className="text-white font-bold text-xl font-orbitron">Message transmitted successfully! 🚀</span>
                <Star className="w-8 h-8 text-white animate-spin-reverse" fill="white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
