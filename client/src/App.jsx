import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/patient/LoginPage";
import RegisterPage from "./pages/patient/RegisterPage";
import MakeAppointment from "./pages/patient/MakeAppointment";
import HomePortal from "./pages/patient/HomePortal";
import PaymentPortal from "./pages/patient/PaymentPortal";
import PatientProfile from "./pages/patient/PatientProfile";
import PatientProfileSettings from "./pages/patient/PatientProfileSettings";
import DoctorLoginPage from "./pages/doctor/doctorLoginPage";
import DoctorAppointment from "./pages/doctor/DoctorAppointments";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import PatientDetails from "./pages/doctor/DoctorPatientDetails";
import DoctorEditMedicalHistory from "./pages/doctor/DoctorEditMedicalHistory";
import DoctorEditPrescriptions from "./pages/doctor/DoctorEditPrescriptions";
import PatientPrescriptions from "./pages/patient/PatientPrescriptions"
import HistoryPortal from "./pages/patient/HistoryPortal"; 
import PatientVisitDetails from "./pages/patient/PatientVisitDetails";
import PatientMedicalHistory from "./pages/patient/PatientMedicalHistory";
import AdminPortal from "./pages/admin/AdminPortal";
import AdminAppointment from "./pages/admin/AdminAppointments";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminLogin from "./pages/admin/AdminLogin";
import DataReports from "./pages/admin/DataReports";
import AdminStaff from "./pages/admin/AdminStaff";
import DoctorPortal from "./pages/doctor/DoctorPortal";
import AdminProfile from "./pages/admin/AdminProfile";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import ContactPage from "./pages/ContactPage";
import DoctorEditVisitDetails from "./pages/doctor/DoctorEditVisitDetails";

//import ProtectedRoute from "./components/ProtectedRoute";
//import AdminRoute from "./components/AdminRoute";

function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/patient/login" element={<LoginPage />} />
            <Route path="/patient/register" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/patient/appointment" element= {<MakeAppointment/>} />
            <Route path="/patient/home" element= {<HomePortal/>} />
            <Route path="/patient/payment" element= {<PaymentPortal/>} />
            <Route path="/patient/profile" element= {<PatientProfile/>} />
            <Route path= "/patient/history" element= {<HistoryPortal/>} />
            <Route path="/patient/prescriptions" element= {<PatientPrescriptions/>} />
            <Route path="/patient/settings" element= {<PatientProfileSettings/>} />
            <Route path="/patient/visit" element= {<PatientVisitDetails/>} />
            <Route path="/patient/history" element= {<PatientMedicalHistory/>} />
            <Route path="/doctor/login" element= {<DoctorLoginPage/>} />
            <Route path="/doctor/appointments" element={<DoctorAppointment/>}/>
            <Route path="/doctor/patients" element={<DoctorPatients/>}/>
            <Route path="/doctor/patients/:patientID" element={<PatientDetails />} />
            <Route path="/doctor/patients/:patientID/medical-history" element={<DoctorEditMedicalHistory />} />
            <Route path="/doctor/patients/:patientID/prescriptions" element={<DoctorEditPrescriptions />} />
            <Route path="/doctor/patients/:patientID/visit-details" element={<DoctorEditVisitDetails />} />
            <Route path="/doctor/home" element= {<DoctorPortal/>} />
            <Route path="/doctor/profile" element= {<DoctorProfile/>} />
            <Route path="/admin/home" element= {<AdminPortal/>} />
            <Route path="/admin/appointments" element={<AdminAppointment/>}/>
            <Route path="/admin/patients" element={<AdminPatients/>}/>
            <Route path="/admin/login" element={<AdminLogin/>}/>
            <Route path="/admin/data-reports" element={<DataReports/>}/>
            <Route path="/admin/staff" element={<AdminStaff/>}/>
            <Route path="/admin/profile" element={<AdminProfile/>}/>
          </Routes>
        </Router>
  );
};

export default App

