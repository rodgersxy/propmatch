// src/components/admin/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-1 md:grid-cols-[250px_1fr]">
      {/* Sidebar - Spans full height on all screens */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col">
        <Header />
        <main className="p-6 md:p-8 flex-grow">
          {/* This is where the specific page content will be rendered */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;