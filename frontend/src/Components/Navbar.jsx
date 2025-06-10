"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, LogIn, LogOut } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // To detect route changes

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Check token on initial load and route change
    checkToken();

    // Re-check token on every route change to ensure navbar updates
    const handleStorageChange = () => {
      checkToken();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [location]); // Re-run on route change

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate("/login");
  };

  const loggedInNavItems = [
    { name: "Study", path: "/study" },
    { name: "Quiz", path: "/quiz" },
    { name: "AI Chat", path: "/ai-chat" },
    { name: "Profile", path: "/profile" },
  ];

  const loggedOutNavItems = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-800/80 backdrop-blur-md border-b border-cyan-400/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl">🧞</div>
            <span className="text-xl font-bold text-cyan-400">StudyGenie</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {isLoggedIn ? (
              loggedInNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                >
                  ⭐{item.name}
                </Link>
              ))
            ) : (
              loggedOutNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                >
                  ⭐{item.name}
                </Link>
              ))
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="relative px-8 py-3 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-full text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-110 hover:rotate-1 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                <span className="relative flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span className="font-bold">LOGOUT</span>
                  <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-red-600 blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
              </button>
            ) : (
              <Link
                to="/login"
                className="relative px-8 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full text-black font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110 hover:rotate-1 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                <span className="relative flex items-center gap-2 text-black">
                  <LogIn className="w-4 h-4 text-black" />
                  <span className="font-bold">LOGIN</span>
                  <Sparkles className="w-4 h-4 group-hover:animate-spin text-black" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10 text-black"></div>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-cyan-400/20">
            <div className="flex flex-col space-y-4">
              {isLoggedIn ? (
                loggedInNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    ⭐{item.name}
                  </Link>
                ))
              ) : (
                loggedOutNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    ⭐{item.name}
                  </Link>
                ))
              )}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="relative inline-block px-6 py-3 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-full text-white font-bold text-center shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 group overflow-hidden"
                >
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    <LogOut className="w-4 h-4" />
                    <span className="font-bold">LOGOUT</span>
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-red-600 blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="relative inline-block px-6 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full text-black font-bold text-center shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 group overflow-hidden"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  <span className="relative flex items-center justify-center gap-2 text-black">
                    <LogIn className="w-4 h-4 text-black" />
                    <span className="font-bold">LOGIN</span>
                    <Sparkles className="w-4 h-4 text-black" />
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;