import { Heart } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-900/90 backdrop-blur-md border-t border-cyan-400/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="text-xl">🧞</div>
            <span className="text-lg font-bold text-cyan-400">StudyGenie</span>
          </div>

          {/* Right Side Text */}
          <div className="flex items-center space-x-2 text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" />
            <span>for Google Hackathon 2024</span>
            <span className="text-yellow-400">⭐</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center mt-6 pt-4 border-t border-gray-700/50">
          <p className="text-gray-500 text-sm">
            © 2024 StudyGenie. Powered by Google Gemini AI. Ready to conquer the cosmos of learning!
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
