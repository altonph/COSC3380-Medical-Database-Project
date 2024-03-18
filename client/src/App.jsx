import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ServicesPage from "./pages/ServicesPage";
import LoginPage from "./pages/patient/LoginPage";
import RegisterPage from "./pages/patient/RegisterPage";
import TestPage from "./pages/TestPage";
import MakeAppointment from "./pages/patient/MakeAppointment";
import HomePortal from "./pages/patient/HomePortal";
import PaymentPortal from "./pages/patient/PaymentPortal";
import PatientProfile from "./pages/patient/PatientProfile";
import PatientProfileSettings from "./pages/patient/PatientProfileSettings";
import DoctorLoginPage from "./pages/doctor/doctorLoginPage";
import PatientPrescriptions from "./pages/patient/PatientPrescriptions"
import HistoryPortal from "./pages/patient/HistoryPortal"; 
import PatientVisitDetails from "./pages/patient/PatientVisitDetails";
import PatientMedicalHistory from "./pages/patient/PatientMedicalHistory";
import AdminPortal from "./pages/admin/AdminPortal";
import EditAppointment from "./pages/admin/EditAppointments";
import AdminPatients from "./pages/admin/AdminPatients";


function App() {
  return (
        <Router>
          <Routes>
            <Route index element= {<LandingPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/patient/login" element={<LoginPage />} />
            <Route path="/patient/register" element={<RegisterPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/patient/appointment" element= {<MakeAppointment/>} />
            <Route path="/patient/home" element= {<HomePortal/>} />
            <Route path="/patient/payment" element= {<PaymentPortal/>} />
            <Route path="/patient/profile" element= {<PatientProfile/>} />
            <Route path= "/patient/history" element= {<HistoryPortal/>} />
            <Route path="/patient/prescriptions" element= {<PatientPrescriptions/>} />
            <Route path="/patient/settings" element= {<PatientProfileSettings/>} />
            <Route path="/doctor/login" element= {<DoctorLoginPage/>} />
            <Route path="/patient/visit" element= {<PatientVisitDetails/>} />
            <Route path="/patient/history" element= {<PatientMedicalHistory/>} />
            <Route path="/admin/portal" element= {<AdminPortal/>} />
            <Route path="/admin/appointments" element={<EditAppointment/>}/>
            <Route path="/admin/patients" element={<AdminPatients/>}/>
          </Routes>
        </Router>
  );
};

export default App

