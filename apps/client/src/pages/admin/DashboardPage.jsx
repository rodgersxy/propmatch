// src/pages/admin/DashboardPage.jsx
import React from 'react';
import { FiHome, FiBarChart2, FiCheckSquare } from 'react-icons/fi';

// A reusable card component for our stats
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-neutral">{value}</p>
    </div>
  </div>
);

const DashboardPage = () => {
  // Placeholder data - we will connect this to the API later
  const stats = {
    listingsThisWeek: 12,
    totalMatchQueries: 482,
    pendingApprovals: 3,
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Listings Added This Week" 
          value={stats.listingsThisWeek}
          icon={<FiHome size={24} className="text-white" />}
          color="bg-blue-500"
        />
        <StatCard 
          title="Total Match Queries" 
          value={stats.totalMatchQueries}
          icon={<FiBarChart2 size={24} className="text-white" />}
          color="bg-teal-500"
        />
        <StatCard 
          title="Listings Pending Approval" 
          value={stats.pendingApprovals}
          icon={<FiCheckSquare size={24} className="text-white" />}
          color="bg-amber-500"
        />
      </div>

      {/* Other sections can go here */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Match Insights & Preferences</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          {/* We will add charts and graphs here in a future step */}
          <p className="text-gray-500">Charts and data visualizations will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;