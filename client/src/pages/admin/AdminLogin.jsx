import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AdminLogin = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const MAX_USERNAME_LENGTH = 50;
  const MAX_PASSWORD_LENGTH = 100;
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setUsernameError('');
    setPasswordError('');

    // Input validation
    if (!Username.trim()) {
      setUsernameError('Username is required.');
      return;
    } else if (Username.length > MAX_USERNAME_LENGTH) {
      setUsernameError('Username cannot exceed 50 characters.')
      return;
    }

    if (!Password.trim()) {
      setPasswordError('Password is required.');
      return;
    } else if (Password.length > MAX_PASSWORD_LENGTH) {
      setPasswordError('Password cannot exceed 100 characters.')
      return;
    }

    try {
      const body = {
        Username: Username,
        Password: Password,
      };

      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        navigateTo('/admin/home');
        console.log('Login Successful');
      } else {
          const data = await response.json();
          console.error('Login failed:', data.message);
          }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 flex justify-center items-center mt-10 mb-10">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="Username" className="block">
                Username
              </label>
              <input
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                id="Username"
                name="Username"
                className={`w-full border py-2 px-3 rounded focus:outline-none ${
                  usernameError ? 'border-red-500' : 'focus:ring focus:border-blue-300'
                }`}
              />
              {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="Password" className="block">
                Password
              </label>
              <input
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
                id="Password"
                name="Password"
                className={`w-full border py-2 px-3 rounded focus:outline-none ${
                  passwordError ? 'border-red-500' : 'focus:ring focus:border-blue-300'
                }`}
              />
              {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Log In
            </button>
          </form>
          <p className="text-center mt-4">
            Not an administrator? <Link to="/doctor/login" className="text-blue-500">Login here</Link>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;