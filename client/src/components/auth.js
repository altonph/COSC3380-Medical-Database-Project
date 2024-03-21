// auth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRequireAuth(role = 'Patient') {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    // console.log(token);
    // console.log(userRole);
    
    if (!token || userRole !== role) {
      navigate('/patient/login'); // Redirect to login page if not authenticated or role doesn't match
    }
  }, []);
}
