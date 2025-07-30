// src/components/admin/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import api from '../../services/api';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout endpoint on the backend
      await api.post('/api/logout');
    } catch (error) {
      console.error('Failed to logout on server:', error);
    } finally {
      // ALWAYS clear local data and redirect, even if server call fails
      localStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
      navigate('/admin/login');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-end items-center">
      <button 
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-500 font-semibold hover:bg-red-100 p-2 rounded-lg transition-colors"
      >
        <FiLogOut />
        Logout
      </button>
    </header>
  );
};

export default Header;