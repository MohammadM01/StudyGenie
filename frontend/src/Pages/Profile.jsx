"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, Mail, Calendar, BookOpen, Star, Edit3, Save, X } from "lucide-react"
import "../styles/home.css"

const Profile = () => {
  const [stars, setStars] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [editData, setEditData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users/profile", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
        const data = await response.json()
        if (data.success) {
          setProfileData(data.data)
          setEditData(data.data)
        } else {
          alert("Failed to fetch profile: " + data.error)
        }
      } catch (error) {
        alert("Error fetching profile: " + error.message)
      }
    }

    fetchProfile()

    const newStars = Array.from({ length: 100 }, (_, i) => ({
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

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please log in to update profile")
      navigate("/login")
      return
    }

    try {
      const response = await fetch("http://localhost:3001/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      })
      const data = await response.json()
      if (data.success) {
        setProfileData(data.data)
        setIsEditing(false)
      } else {
        alert("Failed to update profile: " + data.error)
      }
    } catch (error) {
      alert("Error updating profile: " + error.message)
    }
  }

  const handleCancel = () => {
    setEditData({ ...profileData })
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const recentActivities = [
    { type: "quiz", subject: "Chemistry", date: "June 10, 2025", score: "8/10" },
    { type: "study", subject: "Mathematics", date: "June 9, 2025", duration: "2 hours" },
    { type: "quiz", subject: "Physics", date: "June 8, 2025", score: "9/10" },
    { type: "study", subject: "Biology", date: "June 7, 2025", duration: "1.5 hours" },
  ]

  const achievements = [
    { name: "Quiz Master", description: "Completed 10 quizzes", icon: "🏆" },
    { name: "Study Streak", description: "7 days in a row", icon: "🔥" },
    { name: "Perfect Score", description: "Got 100% on a quiz", icon: "⭐" },
    { name: "Night Owl", description: "Studied past midnight", icon: "🌙" },
  ]

  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }))

  if (!profileData) return <div>Loading...</div>

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

      <div className="relative z-10 pt-24 pb-16">
        <div className="text-center mb-12 px-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-orbitron mb-4">
            Cosmic Profile
          </h1>
          <p className="text-xl text-gray-300">Your journey through the universe of knowledge</p>
        </div>

        <div className="page-container">
          <div className="content-wrapper">
            <div className="profile-container">
              <div
                className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-cyan-400/30 shadow-2xl shadow-cyan-500/10 w-full"
                style={{
                  transform: `perspective(1000px) rotateY(${-mousePosition.x * 0.01}deg)`,
                }}
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 p-1">
                      <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                        {profileData.profilePicture ? (
                          <img
                            src={profileData.profilePicture}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <User className="w-16 h-16 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-gray-600/50 rounded-lg text-white text-center focus:outline-none focus:border-cyan-400/50"
                          placeholder="Name"
                        />
                        <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-gray-600/50 rounded-lg text-white text-center focus:outline-none focus:border-cyan-400/50"
                          placeholder="Email"
                        />
                        <input
                          type="text"
                          name="profilePicture"
                          value={editData.profilePicture || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-gray-600/50 rounded-lg text-white text-center focus:outline-none focus:border-cyan-400/50"
                          placeholder="Profile Picture URL"
                        />
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-2xl font-bold text-white font-orbitron">{profileData.name}</h2>
                        <p className="text-gray-300 flex items-center justify-center gap-2 mt-2">
                          <Mail className="w-4 h-4" />
                          {profileData.email}
                        </p>
                      </div>
                    )}

                    <p className="text-cyan-400">Member since {profileData.joinDate}</p>

                    <div className="flex gap-3 mt-6">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 px-4 rounded-xl hover:from-green-400 hover:to-teal-400 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-gray-400 hover:to-gray-500 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={handleEdit}
                            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-xl hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={handleLogout}
                            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-xl hover:from-red-400 hover:to-pink-400 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Logout
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-purple-400/30 text-center">
                    <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">{profileData.totalQuizzes || 0}</div>
                    <p className="text-gray-300">Quizzes Completed</p>
                  </div>
                  <div className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-cyan-400/30 text-center">
                    <BookOpen className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">{profileData.studyHours || 0}</div>
                    <p className="text-gray-300">Study Hours</p>
                  </div>
                  <div className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-green-400/30 text-center">
                    <Star className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">{profileData.achievements || 0}</div>
                    <p className="text-gray-300">Achievements</p>
                  </div>
                </div>

                <div
                  className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-cyan-400/30 shadow-2xl shadow-cyan-500/10"
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePosition.x * 0.005}deg)`,
                  }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 font-orbitron flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-cyan-400" />
                    Recent Activity
                  </h3>

                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/30 rounded-xl p-4 border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                activity.type === "quiz"
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                  : "bg-gradient-to-r from-cyan-500 to-blue-500"
                              }`}
                            >
                              {activity.type === "quiz" ? (
                                <Star className="w-5 h-5 text-white" />
                              ) : (
                                <BookOpen className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-white font-medium">
                                {activity.type === "quiz" ? "Quiz:" : "Study:"} {activity.subject}
                              </h4>
                              <p className="text-gray-400 text-sm">{activity.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-cyan-400 font-semibold">{activity.score || activity.duration}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-purple-400/30 shadow-2xl shadow-purple-500/10"
                  style={{
                    transform: `perspective(1000px) rotateY(${-mousePosition.x * 0.005}deg)`,
                  }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 font-orbitron flex items-center gap-3">
                    <Star className="w-6 h-6 text-purple-400" />
                    Cosmic Achievements
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/30 rounded-xl p-4 border border-gray-600/30 hover:border-purple-400/50 transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div>
                            <h4 className="text-white font-semibold">{achievement.name}</h4>
                            <p className="text-gray-400 text-sm">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile