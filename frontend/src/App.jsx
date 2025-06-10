import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Study from "./Pages/Study"
import Quiz from "./Pages/Quiz"
import Profile from "./Pages/Profile"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import AIChat from "./Pages/AIChat"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<Study />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ai-chat" element={<AIChat />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
