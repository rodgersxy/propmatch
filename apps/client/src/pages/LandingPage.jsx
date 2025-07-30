// src/pages/LandingPage.jsx

import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Articles from '../components/landing/Articles';
import About from '../components/landing/About';  
import Footer from '../components/landing/Footer';

// Fix the import paths if necessary
// They should be '../components/landing/...' since we are now in the pages folder

function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Articles />
      <About />
      <Footer />
    </main>
  );
}

export default LandingPage;