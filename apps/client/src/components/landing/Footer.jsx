// src/components/landing/Footer.jsx
import { FaFacebookF, FaTiktok, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-hero-gradient from-gradient-start to-gradient-end py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Case Study */}
        <div className="bg-base-200 p-6 rounded-lg max-w-md w-full">
          <p className="text-neutral">
            <span className="font-bold">Case study:</span> "The smart matching system helped 
            me find a home close to schools for my kids."
          </p>
        </div>

        {/* Footer Links & Socials */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-6 font-semibold text-neutral">
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
          <div className="flex gap-4 text-neutral">
            <a href="#" className="hover:text-accent"><FaXTwitter size={20} /></a>
            <a href="#" className="hover:text-accent"><FaFacebookF size={20} /></a>
            <a href='#' className="hover:text-accent"><FaTiktok size={20} /></a>
            <a href="#" className="hover:text-accent"><FaInstagram size={20} /></a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;