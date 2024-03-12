import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TestPage from "./pages/TestPage";
import MakeAppointment from "./pages/MakeAppointment";
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/appointment" element= {<MakeAppointment/>} />
          </Routes>
        </Router>
      </div>
    </>
  )
};

export default App

