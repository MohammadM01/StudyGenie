"use client"

import { useState } from "react"
// Using anchor tags instead of Link for demonstration
import { Menu, X, Sparkles, LogIn } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Study", path: "/study" },
    { name: "Quiz", path: "/quiz" },
    { name: "AI Chat", path: "/ai-chat" },
    { name: "Profile", path: "/profile" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-cyan-400/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl">🧞</div>
            <span className="text-xl font-bold text-cyan-400">StudyGenie</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
              >
                ⭐{item.name}
              </a>
            ))}
            <a
              href="/login"
              className="relative px-8 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110 hover:rotate-1 group overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              
              {/* Content */}
              <span className="relative flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Login
                <Sparkles className="w-4 h-4 group-hover:animate-spin" />
              </span>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-cyan-400/20">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  ⭐{item.name}
                </a>
              ))}
              <a
                href="/login"
                className="relative inline-block px-6 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full text-white font-bold text-center shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 group overflow-hidden"
                onClick={() => setIsOpen(false)}
              >
                {/* Mobile shimmer effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                
                <span className="relative flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4 text-black" />
                  Login
                  <Sparkles className="w-4 h-4" />
                </span>
                
                {/* Mobile glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar