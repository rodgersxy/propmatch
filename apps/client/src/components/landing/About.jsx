// src/components/landing/About.jsx
    import React from 'react';

    const About = () => {
      return (
        // Reusing the gradient for brand consistency
        <section id="about" className="bg-hero-gradient from-gradient-start to-gradient-end py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Text Content */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral tracking-tight">
                  We're More Than a Search Bar.
                </h2>
                <p className="text-lg text-neutral/80 mt-6">
                  PropMatch was born from a simple idea: finding a home should be a joyful and intelligent process, not a stressful one.
                  Based in Nairobi, our team of tech innovators and real estate enthusiasts is passionate about using technology to solve real-world problems for Kenyans. 
                  We believe that the right home can be a foundation for a better life, and our mission is to make that connection happen for you.
                </p>
                <button className="mt-8 bg-accent text-neutral font-bold text-lg px-8 py-3 rounded-full hover:bg-accent-focus transition-all duration-300">
                  Meet The Team
                </button>
              </div>

              {/* Right Column: Image */}
              <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="A diverse team collaborating in a modern office"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </section>
      );
    };

    export default About;