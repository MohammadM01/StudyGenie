"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Send, Bot, User, Star, Zap, MessageCircle, MoreVertical, Trash2 } from "lucide-react"
import "../styles/home.css"

const AIChat = () => {
  const [stars, setStars] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Greetings, cosmic scholar! I’m StudyGenie, your AI study buddy. How can I help you explore the universe of knowledge today?",
      timestamp: new Date(),
    },
  ])
  const [conversations, setConversations] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showMotivation, setShowMotivation] = useState(false)
  const [menuOpen, setMenuOpen] = useState(null)
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return;
    }

    fetchConversations(token);

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
  }, [navigate])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchConversations = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/api/chat/conversations", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setConversations(data.data);
      } else {
        console.error("Failed to fetch conversations:", data.error);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error.message);
    }
  };

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

    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please log in to chat with the AI")
      setIsTyping(false)
      navigate("/login")
      return
    }

    try {
      const response = await fetch("http://localhost:3001/api/chat/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ message: inputMessage }),
      })
      const data = await response.json()
      if (data.success) {
        const aiMessage = {
          id: messages.length + 2,
          type: "ai",
          content: data.data.response,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
        fetchConversations(token);
      } else {
        alert("Failed to get AI response: " + data.error)
      }
    } catch (error) {
      alert("Error sending message: " + error.message)
    }
    setIsTyping(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const deleteChat = async (chatId) => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please log in to delete chats")
      navigate("/login")
      return
    }

    try {
      const response = await fetch(`http://localhost:3001/api/chat/delete/${chatId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setConversations(conversations.filter(chat => chat._id !== chatId))
        if (messages.some(msg => msg.id === 1)) {
          setMessages([
            {
              id: 1,
              type: "ai",
              content:
                "Greetings, cosmic scholar! I’m StudyGenie, your AI study buddy. How can I help you explore the universe of knowledge today?",
              timestamp: new Date(),
            },
          ])
        }
      } else {
        alert("Failed to delete chat: " + data.error)
      }
    } catch (error) {
      alert("Error deleting chat: " + error.message)
    }
  }

  const triggerMotivation = () => {
    setShowMotivation(true)
    setTimeout(() => setShowMotivation(false), 3000)
  }

  const toggleMenu = (chatId) => {
    setMenuOpen(menuOpen === chatId ? null : chatId)
  }

  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      {/* Background Stars */}
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

      {/* Main Layout */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="text-center pt-21 pb-4 px-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageCircle className="w-10 h-10 text-cyan-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-orbitron">
              GEMINI AI Chat
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Your stellar study companion across the cosmos</p>
        </div>

        {/* Chat Layout */}
        <div className="flex-1 flex px-4 pb-4 gap-4 max-h-[calc(100vh-150px)]">
          {/* Chat Sidebar (History) */}
          <div
            className="w-80 cosmic-card bg-gray-800/80 backdrop-blur-lg rounded-2xl p-5 border border-purple-500/30 shadow-lg shadow-purple-500/20 flex flex-col"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.005}deg)`,
            }}
          >
            <h3 className="text-xl font-bold text-white mb-4 font-orbitron flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-400" />
              Chat History
            </h3>

            {/* Scrollable Chat History */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 chat-history">
              {conversations.length > 0 ? (
                conversations.map((chat) => (
                  <div
                    key={chat._id}
                    className="relative bg-gray-700/50 rounded-lg p-3 border border-gray-600/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group"
                  >
                    {/* Chat Info */}
                    <div
                      className="flex-1 pr-10"
                      onClick={() => {
                        setMessages(chat.messages.map((msg, index) => ({
                          id: index + 1,
                          type: msg.type,
                          content: msg.content,
                          timestamp: new Date(msg.timestamp),
                        })));
                        setMenuOpen(null);
                      }}
                    >
                      <p className="text-gray-200 text-sm font-medium truncate">{chat.title}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(chat.lastActivity).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>

                    {/* Three-Dot Menu */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <button
                        onClick={() => toggleMenu(chat._id)}
                        className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-600/50 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      {menuOpen === chat._id && (
                        <div className="absolute right-0 top-10 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-10">
                          <button
                            onClick={() => {
                              deleteChat(chat._id);
                              setMenuOpen(null);
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors w-full text-left rounded-lg text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Chat
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No conversations yet. Start chatting!</p>
              )}
            </div>

            {/* Motivation Blast Button */}
            <button
              onClick={triggerMotivation}
              className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Motivation Blast
            </button>
          </div>

          {/* Main Chat Area */}
          <div
            className="flex-1 cosmic-card bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20 flex flex-col"
            style={{
              transform: `perspective(1000px) rotateY(${-mousePosition.x * 0.005}deg)`,
            }}
          >
            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
                >
                  <div
                    className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-2xl shadow-md break-words ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                        : "bg-gray-700/60 text-gray-100 border border-purple-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === "ai" && <Bot className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />}
                      {message.type === "user" && <User className="w-5 h-5 text-cyan-200 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-gray-700/60 border border-purple-500/30 px-4 py-3 rounded-2xl shadow-md">
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
            <div className="p-4 border-t border-gray-600/30 bg-gray-800/60">
              <div className="flex gap-3">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your cosmic studies..."
                  className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                  rows={2}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className="cosmic-button bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-3 rounded-lg hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
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