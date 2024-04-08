// DoctorRoute.jsx
import { useRequireAuth } from './auth';
import { Navigate, Route } from 'react-router-dom';

function DoctorRoute({ element }) {
  const { isLoggedIn, role } = useRequireAuth('Doctor');
  
  if (!isLoggedIn || role !== 'Doctor') {
    return <Navigate to="/home" />;
  }

  return <Route element={element} />;
}

export default DoctorRoute;
