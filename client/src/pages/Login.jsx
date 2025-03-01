

//import necessary hooks and services
import { useState } from 'react';  // For managing state
import { useNavigate } from 'react-router-dom';  // For navigation after login
import authService from '../services/authService';  // Our authentication service

const Login = () => {

  // State to store form input values
  const [formData, setFormData] = useState({
    username: '',  // Store username input
    password: ''   // Store password input
  });

  // State to store error messages
  const [error, setError] = useState('');

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;  // Get input name and new value
    setFormData(prevState => ({
      ...prevState,  // Keep existing form data
      [name]: value  // Update only the changed field
    }));
  };

  // Handler for form submission
  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent default form submission
    try {
      // Attempt to log in using authService(service)
      const response = await authService.login(formData);
      console.log('Login successful:', response);
      navigate("/");  // Redirect after successful login(hook)
    } catch (err) {
      //state hooks updates error message
      // Handle login errors
      console.error("Login Error:", err.message);
      setError(err.message || "Invalid credentials. Please try again.");
    }
  };

  // JSX for the login form
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">Admin Login</h1>
        {/* Show error message if exists */}
        {error && <p className="text-red-300">{error}</p>}
        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-4">  {/* BUG: handleSubmit should be handleLogin */}
          {/* Username input */}
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          {/* Password input */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* Submit button */}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
