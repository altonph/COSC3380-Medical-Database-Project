// AdminRoute.jsx
import { useRequireAuth } from './auth';
import { Navigate, Route } from 'react-router-dom';

function AdminRoute({ element }) {
  const { isLoggedIn, role } = useRequireAuth('Admin');
  
  if (!isLoggedIn || role !== 'Admin') {
    return <Navigate to="/home" />;
  }

  return <Route element={element} />;
}

export default AdminRoute;
