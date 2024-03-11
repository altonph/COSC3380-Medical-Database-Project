import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TestPage from "./pages/TestPage";
import LoginPage from "./pages/LoginPage"; // Import LoginPage component
import RegisterPage from "./pages/RegisterPage"; // Import RegisterPage component
import "preline/preline";

//for testing, will be adjusted
function App() {
  return (
    <>
      <div className="mx-auto my-auto h-screen bg-white text-black">
        <Router>
          <Routes>
            <Route index element= {<LandingPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} /> {/* Add LoginPage route */}
            <Route path="/register" element={<RegisterPage />} /> {/* Add RegisterPage route */}
            <Route path="/TestPage" element={<TestPage />} />
          </Routes>
        </Router>
      </div>
    </>
  )
};

export default App

