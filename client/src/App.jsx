import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ServicesPage from "./pages/ServicesPage";
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

//import ProtectedRoute from "./components/ProtectedRoute";
//import AdminRoute from "./components/AdminRoute";

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
            <Route path="/doctor/home" element= {<DoctorPortal/>} />
            <Route path="/admin/home" element= {<AdminPortal/>} />
            <Route path="/admin/appointments" element={<AdminAppointment/>}/>
            <Route path="/admin/patients" element={<AdminPatients/>}/>
            <Route path="/admin/login" element={<AdminLogin/>}/>
            <Route path="/admin/data-reports" element={<DataReports/>}/>
            <Route path="/admin/staff" element={<AdminStaff/>}/>

            {/* <Route index element= {<LandingPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/patient/login" element={<LoginPage />} />
            <Route path="/patient/register" element={<RegisterPage />} />
            <Route path="/patient/appointment" element= {<ProtectedRoute><MakeAppointment/></ProtectedRoute>} />
            <Route path="/patient/home" element= {<ProtectedRoute><HomePortal/></ProtectedRoute>} />
            <Route path="/patient/payment" element= {<ProtectedRoute><PaymentPortal/></ProtectedRoute>} />
            <Route path="/patient/profile" element= {<ProtectedRoute><PatientProfile/></ProtectedRoute>} />
            <Route path= "/patient/history" element= {<ProtectedRoute><HistoryPortal/></ProtectedRoute>} />
            <Route path="/patient/prescriptions" element= {<ProtectedRoute><PatientPrescriptions/></ProtectedRoute>} />
            <Route path="/patient/settings" element= {<ProtectedRoute><PatientProfileSettings/></ProtectedRoute>} />
            <Route path="/patient/visit" element= {<ProtectedRoute><PatientVisitDetails/></ProtectedRoute>} />
            <Route path="/patient/history" element= {<ProtectedRoute><PatientMedicalHistory/></ProtectedRoute>} />
            <Route path="/doctor/login" element= {<DoctorLoginPage/>} />
            <Route path="/admin/portal" element= {<AdminPortal/>} />
            <Route path="/admin/appointments" element={<EditAppointment/>}/>
            <Route path="/admin/patients" element={<AdminPatients/>}/> */}

          </Routes>
        </Router>
  );
};

export default App

