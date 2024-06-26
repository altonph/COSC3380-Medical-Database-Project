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
import DoctorSettings from "./pages/doctor/DoctorSettings";
import DoctorLoginPage from "./pages/doctor/doctorLoginPage";
import DoctorAppointment from "./pages/doctor/DoctorAppointments";
import DoctorMakeAppointment from "./pages/doctor/DoctorMakeAppointment";
import DoctorAddVisitDetails from "./pages/doctor/DoctorAddVisitDetails";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import PatientDetails from "./pages/doctor/DoctorPatientDetails";
import DoctorEditMedicalHistory from "./pages/doctor/DoctorEditMedicalHistory";
import DoctorAddMedicalHistory from "./pages/doctor/DoctorAddMedicalHistory";
import DoctorEditPrescriptions from "./pages/doctor/DoctorEditPrescriptions";
import DoctorEditVisitDetails from "./pages/doctor/DoctorEditVisitDetails";
import DoctorEditPatientInformation from "./pages/doctor/DoctorEditPatientInformation";
import StaffPortal from "./pages/staff/StaffPortal";
import StaffPatients from "./pages/staff/StaffPatients";
import StaffPatientDetails from "./pages/staff/StaffPatientDetails";
import StaffEditPatientInformation from "./pages/staff/StaffEditPatientInformation";
import StaffAddMedicalHistory from "./pages/staff/StaffAddMedicalHistory";
import StaffEditVisitDetails from "./pages/staff/StaffEditVisitDetails";
import StaffEditMedicalHistory from "./pages/staff/StaffEditMedicalHistory";
import StaffEditPrescriptions from "./pages/staff/StaffEditPrescriptions";
import StaffAppointment from "./pages/staff/StaffAppointments";
import StaffMakeAppointment from "./pages/staff/StaffMakeAppointment";
import StaffAddVisitDetails from "./pages/staff/StaffAddVisitDetails";
import PatientPrescriptions from "./pages/patient/PatientPrescriptions"
import PatientMedicalHistory from "./pages/patient/PatientMedicalHistory"; 
import PatientVisitDetails from "./pages/patient/PatientVisitDetails";
import AdminPortal from "./pages/admin/AdminPortal";
import AdminAppointment from "./pages/admin/AdminAppointments";
import AdminMakeAppointment from "./pages/admin/AdminMakeAppointment";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminLogin from "./pages/admin/AdminLogin";
import AppointmentDataReport from "./pages/admin/AppointmentDataReport";
import FinanceDataReport from "./pages/admin/FinanceDataReport";
import AdminStaff from "./pages/admin/AdminStaff";
import DoctorPortal from "./pages/doctor/DoctorPortal";
import AdminProfile from "./pages/admin/AdminProfile";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import ContactPage from "./pages/ContactPage";
import AdminRegisterDentist from "./pages/admin/AdminRegisterDentist";
import AdminRegisterStaff from "./pages/admin/AdminRegisterStaff";
import DemographicDataReport from "./pages/admin/DemographicDataReport";
import AdminRegisterPatient from "./pages/admin/AdminRegisterPatient";
import AdminDentist from "./pages/admin/AdminDentist";
import AdminAddVisitDetails from "./pages/admin/AdminAddVisitDetails";
import StaffProfile from "./pages/staff/StaffProfile";
import StaffProfileSetting from "./pages/staff/StaffProfileSettings";
import AdminSettings from "./pages/admin/AdminSettings";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import DentistRoute from "./components/DentistRoute";
import StaffRoute from "./components/StaffRoute";

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
            <Route path="/doctor/login" element= {<DoctorLoginPage/>} />
            <Route path="/admin/login" element={<AdminLogin/>}/>
            <Route
              path="/patient/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/appointment" element={<MakeAppointment />} />
                    <Route path="/home" element={<HomePortal />} />
                    <Route path="/payment" element={<PaymentPortal />} />
                    <Route path="/profile" element={<PatientProfile />} />
                    <Route path="/prescriptions" element={<PatientPrescriptions />} />
                    <Route path="/settings" element={<PatientProfileSettings />} />
                    <Route path="/visit" element={<PatientVisitDetails />} />
                    <Route path="/history" element={<PatientMedicalHistory />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/*"
              element={
                <DentistRoute>
                  <Routes>
                  <Route path="/settings" element={<DoctorSettings/>} />
                  <Route path="/appointments" element={<DoctorAppointment/>}/>
                  <Route path="/appointments/make-appointment" element={<DoctorMakeAppointment />} />
                  <Route path="/appointments/add-visit-details" element={<DoctorAddVisitDetails />} />
                  <Route path="/patients" element={<DoctorPatients/>}/>
                  <Route path="/patients/:patientID" element={<PatientDetails />} />
                  <Route path="/patients/:patientID/medical-history" element={<DoctorEditMedicalHistory />} />
                  <Route path="/patients/:patientID/add-medical-history" element={<DoctorAddMedicalHistory />} />
                  <Route path="/patients/:patientID/prescriptions" element={<DoctorEditPrescriptions />} />
                  <Route path="/patients/:patientID/visit-details" element={<DoctorEditVisitDetails />} />
                  <Route path="/patients/:patientID/patient-information" element={<DoctorEditPatientInformation />} />
                  <Route path="/home" element= {<DoctorPortal/>} />
                  <Route path="/profile" element= {<DoctorProfile/>} />
                  </Routes>
                </DentistRoute>
              }
            />
            <Route
              path="/staff/*"
              element={
                <StaffRoute>
                  <Routes>
                  <Route path="/home" element={<StaffPortal />} />
                  <Route path="/patients" element={<StaffPatients />} />
                  <Route path="/patients/:patientID" element={<StaffPatientDetails />} />
                  <Route path="/patients/:patientID/patient-information" element={<StaffEditPatientInformation/>} />
                  <Route path="/patients/:patientID/visit-details" element={<StaffEditVisitDetails/>} />
                  <Route path="/patients/:patientID/add-medical-history" element={<StaffAddMedicalHistory/>} />
                  <Route path="/patients/:patientID/medical-history" element={<StaffEditMedicalHistory />} />
                  <Route path="/patients/:patientID/prescriptions" element={<StaffEditPrescriptions />} />
                  <Route path="/appointments" element={<StaffAppointment />} />
                  <Route path="/appointments/make-appointment" element={<StaffMakeAppointment/>} />
                  <Route path="/appointments/add-visit-details" element={<StaffAddVisitDetails />} />
                  <Route path="/profile" element={<StaffProfile/>}/>
                  <Route path="/settings" element={<StaffProfileSetting/>}/>
                  </Routes>
                </StaffRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <Routes>
                  <Route path="/home" element= {<AdminPortal/>} />
                  <Route path="/appointments" element={<AdminAppointment/>}/>
                  <Route path="/appointments/make-appointment" element={<AdminMakeAppointment />} />
                  <Route path="/appointments/add-visit-details" element={<AdminAddVisitDetails />} />
                  <Route path="/patients" element={<AdminPatients/>}/>
                  <Route path="/appointment-data-report" element={<AppointmentDataReport/>}/>
                  <Route path="/finance-data-report" element={<FinanceDataReport/>}/>
                  <Route path="/demographic-data-report" element={<DemographicDataReport/>}/>
                  <Route path="/staff" element={<AdminStaff/>}/>
                  <Route path="/profile" element={<AdminProfile/>}/>
                  <Route path="/register-dentist" element={<AdminRegisterDentist/>}/>
                  <Route path="/register-staff" element={<AdminRegisterStaff/>}/>
                  <Route path="/register-patient" element={<AdminRegisterPatient/>}/>
                  <Route path="/dentists" element={<AdminDentist/>}/>
                  <Route path="/settings" element={<AdminSettings/>}/>
                  </Routes>
                </AdminRoute>
              }
            />
          </Routes>
        </Router>
  );
};

export default App
