// src/pages/admin/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Import our pre-configured api client

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Step 1: Send the login request to the backend
      const response = await api.post('/api/login', { email, password });

      // Step 2: Get the authentication token from the response data
      const token = response.data.token;

      // Step 3: Store the token securely in the browser's local storage.
      // This allows the user to stay logged in even after refreshing the page.
      localStorage.setItem('authToken', token);

      // Step 4: Set the Authorization header for all future API requests
      // made with this Axios instance. This is how we prove we're logged in.
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Step 5: If everything is successful, navigate to the admin dashboard.
      navigate('/admin/dashboard');

    } catch (err) {
      // Handle potential errors
      if (err.response && err.response.status === 422) {
        // This is a validation error from Laravel (e.g., wrong credentials)
        setError(err.response.data.errors.email[0]);
      } else {
        // This is any other error (e.g., network down, 500 server error)
        setError('An unexpected error occurred. Please try again.');
        console.error("Login error:", err); // Log the full error for debugging
      }
    } finally {
      // This will always run, whether the login succeeds or fails
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-neutral">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
              placeholder="admin@propmatch.app"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-accent text-white font-bold py-2 rounded-lg hover:bg-primary-focus transition duration-300 disabled:bg-teal-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;