// src/components/admin/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiList, FiEdit, FiUsers, FiMessageSquare, FiSettings } from 'react-icons/fi';
import { FaHome } from 'react-icons/fa';

const Sidebar = () => {
  const linkClasses = "flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-teal-100 hover:text-teal-800 transition-colors";
  const activeLinkClasses = "bg-teal-500 text-white font-bold";

  return (
    <aside className="bg-white border-r border-gray-200 p-4 flex-col hidden md:flex">
      <div className="flex items-center gap-2 mb-8">
        <FaHome size={30} className="text-primary" />
        <span className="text-2xl font-bold text-neutral">PropMatch</span>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses}>
          <FiGrid size={20} /> Dashboard
        </NavLink>
        <NavLink to="/admin/properties" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses}>
          <FiList size={20} /> Properties
        </NavLink>
        <NavLink to="/admin/articles" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses}>
          <FiEdit size={20} /> Articles
        </NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses}>
          <FiUsers size={20} /> Users
        </NavLink>
        <NavLink to="/admin/inbox" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses}>
          <FiMessageSquare size={20} /> Inbox
        </NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses}>
          <FiSettings size={20} /> Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;