"use client"

import { Heart, Rocket, Twitter, Github, Mail, Instagram, Linkedin } from "lucide-react"
import { useState, useEffect } from "react"

const Footer = () => {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.3 + 0.2,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
    }))
    setStars(newStars)
  }, [])

  return (
    <footer className="bg-zinc-900 backdrop-blur-md border-t border-cyan-400/30 relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 pointer-events-none select-none">
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
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 relative group">
            <div className="relative">
              <Rocket className="w-5 h-5 text-cyan-400 animate-orbit group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
              <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-orbit-ring" style={{ animationDuration: "6s" }} />
            </div>
            <span className="text-lg font-medium bg-gradient-to-r from-cyan-300 to-purple-600 bg-clip-text text-transparent animate-glow group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] transition-all duration-300">
              StudyGenie
            </span>
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gradient-to-b from-transparent to-cyan-400 animate-rocket-trail" />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6 text-sm font-medium text-gray-300">
            <a href="#about" className="hover:bg-gradient-to-r hover:from-cyan-300 hover:to-purple-600 hover:bg-clip-text hover:text-transparent hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] transition-all duration-300 animate-glow">
              About
            </a>
            <a href="#features" className="hover:bg-gradient-to-r hover:from-cyan-300 hover:to-purple-600 hover:bg-clip-text hover:text-transparent hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] transition-all duration-300 animate-glow">
              Features
            </a>
            <a href="#contact" className="hover:bg-gradient-to-r hover:from-cyan-300 hover:to-purple-600 hover:bg-clip-text hover:text-transparent hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] transition-all duration-300 animate-glow">
              Contact
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group">
              <Twitter className="w-4 h-4 text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] transition-all duration-300 animate-pulse" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group">
              <Github className="w-4 h-4 text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] transition-all duration-300 animate-pulse" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group">
              <Instagram className="w-4 h-4 text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] transition-all duration-300 animate-pulse" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group">
              <Linkedin className="w-4 h-4 text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] transition-all duration-300 animate-pulse" />
            </a>
            <a href="mailto:contact@studygenie.com" className="group">
              <Mail className="w-4 h-4 text-gray-300 hover:text-cyan-400 hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] transition-all duration-300 animate-pulse" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center mt-4 pt-2 border-t border-cyan-400/40">
          <p className="text-xs font-medium bg-gradient-to-r from-cyan-300 to-purple-600 bg-clip-text text-transparent animate-glow">
            © 2025 StudyGenie. Powered by Google Gemini AI.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes orbit {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }
        @keyframes orbit-ring {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: rotate(180deg) scale(1.05);
            opacity: 0.5;
          }
          100% {
            transform: rotate(360deg) scale(1);
            opacity: 0.3;
          }
        }
        @keyframes rocket-trail {
          0% {
            height: 4px;
            opacity: 0.7;
          }
          50% {
            height: 8px;
            opacity: 0.3;
          }
          100% {
            height: 4px;
            opacity: 0;
          }
        }
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 3px rgba(0, 255, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
        .animate-orbit {
          animation: orbit 5s ease-in-out infinite;
        }
        .animate-orbit-ring {
          animation: orbit-ring 6s linear infinite;
        }
        .animate-rocket-trail {
          animation: rocket-trail 1.5s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </footer>
  )
}

export default Footer
