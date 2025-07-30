// src/components/landing/Navbar.jsx
import { useState } from 'react';
import { FaBars, FaTimes, FaHome } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <header className="w-full h-[80px] sticky top-0 left-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <FaHome size={30} className="text-primary" />
          <span className="text-2xl font-bold text-neutral">PropMatch</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-x-8">
          <a href="#">
            <button className="bg-accent text-neutral font-bold px-6 py-2.5 rounded-md hover:bg-accent-focus transition-all duration-300">
              Find My Perfect Match
            </button>
          </a>
          <a href="#articles" className="font-semibold text-neutral hover:text-primary transition-colors duration-300">Articles</a>
          <a href="#about" className="font-semibold text-neutral hover:text-primary transition-colors duration-300">About</a>
          <a href="#" className="font-semibold text-neutral hover:text-primary transition-colors duration-300">Login</a>
          <a href="#">
            <button className="bg-accent text-neutral font-bold px-6 py-2.5 rounded-full hover:bg-accent-focus transition-all duration-300">
              Sign up
            </button>
          </a>
        </nav>

        {/* Hamburger Icon */}
        <div onClick={handleClick} className="md:hidden z-10 cursor-pointer text-neutral">
          {!nav ? <FaBars size={25} /> : <FaTimes size={25} />}
        </div>

        {/* Mobile Menu */}
        <nav className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center transition-transform duration-300 ease-in-out ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
          <a href="#" onClick={handleClick} className="py-6">
            <button className="bg-accent text-neutral font-bold px-8 py-4 rounded-md text-2xl">
              Find My Perfect Match
            </button>
          </a>
          <a href="#articles" onClick={handleClick} className="py-6 text-4xl hover:text-primary">Articles</a>
          <a href="#about" onClick={handleClick} className="py-6 text-4xl hover:text-primary">About</a>
          <a href="#" onClick={handleClick} className="py-6 text-4xl hover:text-primary">Login</a>
          <a href="#" onClick={handleClick} className="py-6">
            <button className="bg-accent text-neutral font-bold px-8 py-4 rounded-full text-2xl">
              Sign up
            </button>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;