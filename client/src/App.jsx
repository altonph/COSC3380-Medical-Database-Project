import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/patient/LoginPage";
import RegisterPage from "./pages/patient/RegisterPage";
import TestPage from "./pages/TestPage";
import MakeAppointment from "./pages/patient/MakeAppointment";
import HomePortal from "./pages/patient/HomePortal";
import "preline/preline";

function App() {
  return (
    <>
      <div className="mx-auto my-auto h-screen bg-white text-black">
        <Router>
          <Routes>
            <Route index element= {<LandingPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/patient/login" element={<LoginPage />} />
            <Route path="/patient/register" element={<RegisterPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/patient/appointment" element= {<MakeAppointment/>} />
            <Route path="/patient/home" element= {<HomePortal/>} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App

