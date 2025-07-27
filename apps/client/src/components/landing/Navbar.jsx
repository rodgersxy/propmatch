// src/components/landing/Navbar.jsx
import { useState } from 'react';
import { FaBars, FaTimes, FaHome } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <header className="w-full h-[80px] sticky top-0 left-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 z-30 relative">
          <FaHome size={30} className="text-primary" />
          <span className="text-2xl font-bold text-neutral">PropMatch</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-x-8">
          <a href="#" className="font-semibold text-neutral hover:text-primary transition-colors duration-300">Find Your Match</a>
          <a href="#" className="font-semibold text-neutral hover:text-primary transition-colors duration-300">Login</a>
          <a href="#">
            <button className="bg-accent/80 text-black font-bold px-6 py-2.5 rounded-full hover:bg-primary-focus transition-all duration-300">
              Sign up
            </button>
          </a>
        </nav>

        {/* Hamburger Icon */}
        <div 
          onClick={handleClick} 
          className="md:hidden z-30 cursor-pointer text-neutral p-2 relative"
        >
          {!nav ? <FaBars size={25} /> : <FaTimes size={25} />}
        </div>

        {/* Mobile Menu Overlay */}
        {nav && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-20"
            onClick={handleClick}
          />
        )}

        {/* Mobile Menu */}
        <nav className={`
          md:hidden 
          fixed 
          top-0 
          left-0 
          w-full 
          h-screen 
          bg-white 
          flex 
          flex-col 
          justify-center 
          items-center
          z-25
          transform 
          transition-transform 
          duration-300 
          ease-in-out
          ${nav ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <a 
            href="#" 
            className="py-6 text-4xl text-neutral hover:text-primary transition-colors duration-300"
            onClick={handleClick}
          >
            Find Your Match
          </a>
          <a 
            href="#" 
            className="py-6 text-4xl text-neutral hover:text-primary transition-colors duration-300"
            onClick={handleClick}
          >
            Login
          </a>
          <a 
            href="#" 
            className="py-6"
            onClick={handleClick}
          >
            <button className="bg-accent/80 text-black font-bold px-8 py-4 rounded-full text-2xl hover:bg-primary-focus transition-all duration-300">
              Sign up
            </button>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;