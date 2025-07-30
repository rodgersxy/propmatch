// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layouts and Pages
import LandingPage from './pages/LandingPage';
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import PropertyListingsPage from './pages/admin/PropertyListingsPage';
import ArticleManagementPage from './pages/admin/ArticleManagementPage';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin Protected Routes - All wrapped by AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="properties" element={<PropertyListingsPage />} />
          <Route path="articles" element={<ArticleManagementPage />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;