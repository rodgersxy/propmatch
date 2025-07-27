// src/App.jsx

import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import HowItWorks from './components/landing/HowItWorks'; // 1. Import the component
import Footer from './components/landing/Footer';

function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      
      {/* 2. Replace the placeholder div with our new component */}
      <HowItWorks />

      <Footer />
    </main>
  )
}

export default App;