import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRequireAuth(role = 'Patient') {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    
    if (!token || !userRole || userRole.toLowerCase() !== role.toLowerCase()) {
      navigate('/home'); // Redirect to home page if not authenticated or role doesn't match
    }

    // Handle token expiry
    const checkTokenExpiry = async () => {
      try {
        const response = await fetch("http://localhost:5000/check-token", {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
          localStorage.removeItem('token'); // Clear token from local storage
          localStorage.removeItem('role'); // Clear role from local storage
          navigate('/home'); // Redirect to home page if token is expired
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    checkTokenExpiry();

    // Set up interval to periodically check token expiry
    const interval = setInterval(checkTokenExpiry, 60000); // Check every minute

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [navigate, role]); // Include navigate and role in the dependency array
}
