"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Brain, Zap, Star, Trophy, Rocket } from "lucide-react"
import "../styles/home.css"

const Quiz = () => {
  const [stars, setStars] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [quizConfig, setQuizConfig] = useState({
    topic: "",
    difficulty: "",
    questionCount: "",
  })
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showMotivation, setShowMotivation] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

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

  const handleConfigChange = (e) => {
    setQuizConfig({
      ...quizConfig,
      [e.target.name]: e.target.value,
    })
  }

  const generateQuiz = async () => {
    setIsGenerating(true)
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please log in to generate a quiz")
      setIsGenerating(false)
      navigate("/login")
      return
    }

    try {
      const response = await fetch("http://localhost:3001/api/quiz/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          topic: quizConfig.topic,
          difficulty: quizConfig.difficulty,
          questionCount: parseInt(quizConfig.questionCount),
        }),
      })
      const data = await response.json()
      if (data.success) {
        setCurrentQuiz(data.data)
        setCurrentQuestion(0)
        setAnswers([])
        setShowResults(false)
        setStartTime(new Date())
      } else {
        alert("Failed to generate quiz: " + data.error)
      }
    } catch (error) {
      alert("Error generating quiz: " + error.message)
    }
    setIsGenerating(false)
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = async () => {
    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
    } else {
      const timeSpent = Math.floor((new Date() - startTime) / 1000)
      const token = localStorage.getItem("token")
      try {
        const response = await fetch("http://localhost:3001/api/quiz/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            quizId: currentQuiz._id,
            userAnswers: newAnswers,
            timeSpent,
          }),
        })
        const data = await response.json()
        if (data.success) {
          setCurrentQuiz(data.data)
          setShowResults(true)
        } else {
          alert("Failed to submit quiz: " + data.error)
        }
      } catch (error) {
        alert("Error submitting quiz: " + error.message)
      }
    }
  }

  const calculateScore = () => {
    return currentQuiz.score
  }

  const triggerMotivation = () => {
    setShowMotivation(true)
    setTimeout(() => setShowMotivation(false), 3000)
  }

  const restartQuiz = () => {
    setCurrentQuiz(null)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setSelectedAnswer("")
    setStartTime(null)
  }

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
          <div className="flex justify-center mb-4">
            <Brain className="w-16 h-16 text-purple-400 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-orbitron mb-4">
            GEMINI Quiz Engine
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your knowledge with AI-generated quizzes tailored to your cosmic journey
          </p>
        </div>

        <div className="page-container">
          <div className="content-wrapper">
            <div className="centered-grid single-column">
              {!currentQuiz && !showResults ? (
                <div
                  className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-purple-400/30 shadow-2xl shadow-purple-500/10 w-full"
                  style={{
                    transform: `perspective(1000px) rotateY(${-mousePosition.x * 0.01}deg)`,
                  }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6 font-orbitron flex items-center gap-3">
                    <Zap className="w-6 h-6 text-purple-400" />
                    Configure Your Quiz
                  </h2>

                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Topic</label>
                      <input
                        type="text"
                        name="topic"
                        value={quizConfig.topic}
                        onChange={handleConfigChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                        placeholder="e.g., Chemistry, Math, History"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Difficulty</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["Easy", "Medium", "Hard"].map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setQuizConfig({ ...quizConfig, difficulty: level })}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                              quizConfig.difficulty === level
                                ? "border-purple-400 bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                                : "border-gray-600 bg-slate-700/50 text-gray-300 hover:border-gray-500"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Number of Questions</label>
                      <select
                        name="questionCount"
                        value={quizConfig.questionCount}
                        onChange={handleConfigChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                      >
                        <option value="">Select count</option>
                        <option value="5">5 questions</option>
                        <option value="10">10 questions</option>
                        <option value="15">15 questions</option>
                        <option value="20">20 questions</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={generateQuiz}
                      disabled={
                        isGenerating || !quizConfig.topic || !quizConfig.difficulty || !quizConfig.questionCount
                      }
                      className="w-full cosmic-button bg-gradient-to-r from-purple-500 to-cyan-600 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-400 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 font-orbitron disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Generating Quiz...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Rocket className="w-5 h-5" />
                          Start Cosmic Quiz
                        </span>
                      )}
                    </button>
                  </form>
                </div>
              ) : showResults ? (
                <div className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-green-400/30 shadow-2xl shadow-green-500/10 w-full text-center">
                  <div className="mb-6">
                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
                    <h2 className="text-3xl font-bold text-white font-orbitron mb-2">Quiz Complete!</h2>
                    <p className="text-gray-300">You've conquered the cosmic challenge!</p>
                  </div>

                  <div className="bg-slate-700/30 rounded-xl p-6 mb-6">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">
                      {calculateScore()}/{currentQuiz.questions.length}
                    </div>
                    <p className="text-gray-300">Correct Answers</p>
                  </div>

                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {currentQuiz.questions.map((question, index) => (
                      <div key={index} className="bg-slate-600/30 p-4 rounded-xl">
                        <p className="text-white font-medium mb-2">{question.question}</p>
                        <p className={`text-sm ${answers[index] === question.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                          Your Answer: {question.options[answers[index]]}
                        </p>
                        <p className="text-sm text-gray-300">Correct Answer: {question.options[question.correctAnswer]}</p>
                        <p className="text-sm text-gray-400 mt-1">{question.explanation}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={restartQuiz}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-400 hover:to-cyan-400 transition-all duration-300 transform hover:scale-105"
                    >
                      New Quiz
                    </button>
                    <button
                      onClick={triggerMotivation}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105"
                    >
                      Motivation Blast
                    </button>
                  </div>
                </div>
              ) : (
                <div className="cosmic-card bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-cyan-400/30 shadow-2xl shadow-cyan-500/10 w-full">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-cyan-400 font-semibold">
                        Question {currentQuestion + 1} of {currentQuiz.questions.length}
                      </span>
                      <span className="text-purple-400 font-semibold">{currentQuiz.topic}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-6 font-orbitron">
                    {currentQuiz.questions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {currentQuiz.questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          selectedAnswer === index
                            ? "border-cyan-400 bg-cyan-400/10 text-white"
                            : "border-gray-600 bg-slate-700/30 text-gray-300 hover:border-gray-500 hover:bg-slate-700/50"
                        }`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === ""}
                    className="w-full cosmic-button bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 font-orbitron disabled:opacity-50"
                  >
                    {currentQuestion === currentQuiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  </button>
                </div>
              )}
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
                <span className="text-white font-bold text-xl font-orbitron">Cosmic knowledge unlocked! 🎉</span>
                <Star className="w-8 h-8 text-white animate-spin-reverse" fill="white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz