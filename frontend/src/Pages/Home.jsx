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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-purple-950 relative overflow-x-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 pointer-events-none select-none">
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
      <main className="flex-1 flex flex-col justify-center relative z-10 px-2 sm:px-6 md:px-8 pt-28 ">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-2xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg leading-tight relative animate-crazy-rocket">
            Welcome to StudyGenie!
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-12 bg-gradient-to-b from-orange-500 to-red-600 animate-rocket-flame" />
            <span className="absolute bottom-0 left-1/2 transform -translate-x-3/4 w-2 h-2 bg-yellow-300 rounded-full animate-rocket-spark" style={{ animationDelay: "0.1s" }} />
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-rocket-spark" style={{ animationDelay: "0.3s" }} />
            <span className="absolute bottom-0 left-1/2 transform translate-x-1/4 w-2 h-2 bg-purple-300 rounded-full animate-rocket-spark" style={{ animationDelay: "0.5s" }} />
            <span className="absolute bottom-0 left-1/2 transform translate-x-3/4 w-2 h-2 bg-orange-300 rounded-full animate-rocket-spark" style={{ animationDelay: "0.7s" }} />
            <Rocket className="absolute top-2/2 left-1/4 transform -translate-y-1/2 -translate-x-3/2 w-13 h-15 text-white animate-rocket-icon" />
            <Rocket className="absolute top-2/2 right-1/4 transform -translate-y-1/2 translate-x-3/2 w-13 h-15 text-white animate-rocket-icon" style={{ animationDelay: "0.4s" }} />
          </h1>
          <style jsx>{`
            @keyframes crazy-rocket {
              0% {
                transform: translateY(0) rotate(0deg) scale(1);
                filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
              }
              10% {
                transform: translateY(-20px) rotate(5deg) scale(1.05);
                filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.7));
              }
              20% {
                transform: translateY(-10px) rotate(-5deg) scale(1);
                filter: drop-shadow(0 0 20px rgba(255, 0, 255, 0.7));
              }
              30% {
                transform: translateY(-30px) rotate(8deg) scale(1.1);
                filter: drop-shadow(0 0 25px rgba(255, 165, 0, 0.8));
              }
              40% {
                transform: translateY(-15px) rotate(-8deg) scale(1);
                filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.7));
              }
              50% {
                transform: translateY(-40px) rotate(0deg) scale(1.15);
                filter: drop-shadow(0 0 30px rgba(255, 255, 255, 1));
              }
              60% {
                transform: translateY(-20px) rotate(10deg) scale(1);
                filter: drop-shadow(0 0 20px rgba(255, 0, 255, 0.7));
              }
              70% {
                transform: translateY(-10px) rotate-10deg) scale(1.05);
                filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.7));
              }
              100% {
                transform: translateY(0) rotate(0deg) scale(1);
                filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
              }
            }
            @keyframes rocket-flame {
              0% {
                height: 12px;
                opacity: 1;
                transform: translateY(0) scale(1);
              }
              50% {
                height: 48px;
                opacity: 0.8;
                transform: translateY(20px) scale(1.2);
              }
              100% {
                height: 12px;
                opacity: 0;
                transform: translateY(40px) scale(0.8);
              }
            }
            @keyframes rocket-spark {
              0% {
                transform: translateY(0) scale(1);
                opacity: 1;
              }
              100% {
                transform: translateY(60px) scale(0.3);
                opacity: 0;
              }
            }
            @keyframes rocket-icon {
              0% {
                transform: translateY(-50%) translateX(-1px) rotate(0deg);
                opacity: 1;
              }
              50% {
                transform: translateY(-50%) translateX(-6px) rotate(45deg);
                opacity: 0.8;
              }
              100% {
                transform: translateY(-50%) translateX(-1px) rotate(0deg);
                opacity: 1;
              }
            }
            .animate-crazy-rocket {
              animation: crazy-rocket 5s ease-in-out infinite;
            }
            .animate-rocket-flame {
              animation: rocket-flame 3s ease-in-out infinite;
            }
            .animate-rocket-spark {
              animation: rocket-spark 1s ease-in-out infinite;
            }
            .animate-rocket-icon {
              animation: rocket-icon 2s ease-in-out infinite;
            }
          `}</style>
          <h2 className="text-2xl sm:text-xl md:text-3xl font-semibold text-cyan-300 mb-3 drop-shadow pt-1">
            Your AI-Powered Study Buddy!
          </h2>
          <p className="text-base sm:text-lg md:text-sm text-gray-200 max-w-3xl mx-auto mb-4 leading-relaxed">
            Embark on a Cosmic Learning Quest with Personalized Plans, Quizzes, and More!
          </p>
          <div className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-md rounded-2xl p-2 border border-cyan-400/30 mb-12 shadow-lg">
            <p className="text-gray-100 text-base md:text-md leading-relaxed">
              StudyGenie uses <span className="text-cyan-300 font-semibold">Google Gemini AI</span> to deliver custom
              study plans, instant doubt solutions, quick quizzes, and mood-based tips—synced to your {" "}
              <span className="text-purple-300 font-semibold">Google Calendar</span> for stellar results!
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-14 drop-shadow">
            Cosmic Features
          </h2>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/80 backdrop-blur rounded-2xl p-6 border border-gray-700/60 hover:border-cyan-400/70 transition-all duration-500 hover:scale-105 transform text-center shadow-lg hover:shadow-cyan-400/10"
              >
                <div
                  className={`w-20 h-20 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 drop-shadow">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </section>

        {/* Central Cosmic Visual */}
        <section className="flex justify-center mb-20">
          <div className="relative">
            <div
              className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-dashed border-purple-400/60 animate-spin"
              style={{ animationDuration: "20s" }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50">
                  <Star className="w-14 h-14 sm:w-16 sm:h-16 text-white" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Motivation Quote */}
        <section className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full px-8 py-4 border border-yellow-400/40 shadow">
            <Star className="w-6 h-6 text-yellow-400 animate-spin" fill="currentColor" />
            <span className="text-yellow-300 font-bold text-base md:text-lg">
              "Slay that math dragon, cosmic hero!"
            </span>
            <Star
              className="w-6 h-6 text-yellow-400 animate-spin"
              fill="currentColor"
              style={{ animationDirection: "reverse" }}
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-4">
          <button className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-lg md:text-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-110 shadow-2xl shadow-cyan-500/30 focus:outline-none focus:ring-4 focus:ring-cyan-400/40">
            <span className="flex items-center gap-3">
              <Rocket className="w-6 h-6 group-hover:animate-bounce" />
              Login to Launch
              <Rocket className="w-6 h-6 group-hover:animate-bounce" />
            </span>
          </button>
          <p className="text-gray-400 mt-4 text-base md:text-lg">
            Ready to begin your cosmic learning adventure?
          </p>
        </section>
      </main>
    </div>
  )
}

export default Home