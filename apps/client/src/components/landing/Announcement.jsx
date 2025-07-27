// src/components/landing/Announcement.jsx
import { FaChevronRight } from 'react-icons/fa';

const Announcement = () => {
  return (
    <div className="bg-white/80 hover:bg-white transition-colors duration-300 backdrop-blur-sm rounded-full p-1.5 inline-flex items-center gap-2 border border-gray-200 cursor-pointer">
      <span className="bg-accent/80 text-neutral font-semibold rounded-full px-3 py-0.5 text-lg">
        New
      </span>
      <p className="text-neutral font-medium text-lg">
        Kenya's First Smart Real Estate Matcher
      </p>
      <FaChevronRight className="text-gray-500 text-lg" />
    </div>
  );
};

export default Announcement;