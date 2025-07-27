// src/components/landing/HowItWorks.jsx
import { FaMousePointer, FaSearchLocation, FaHome, FaLongArrowAltRight } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    { icon: <FaMousePointer size={40} />, text: 'Tell Us Your Preferences' },
    { icon: <FaSearchLocation size={40} />, text: 'We Find Matches' },
    { icon: <FaHome size={40} />, text: 'Match, Visit, Move In' },
  ];

  return (
    // Add a section wrapper with background and padding
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        
        {/* Add a title for the section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral">How PropMatch Works</h2>
          <p className="text-neutral/70 mt-2">Your journey to the perfect home, simplified.</p>
        </div>

        {/* The card itself - NO negative margin, NO z-index */}
        <div className="rounded-xl shadow-xl border border-accent p-8 md:p-10">
          <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4">
            
            {steps.map((step, index) => (
              // Use a React Fragment with a key for proper list rendering
              <React.Fragment key={index}>
                {/* The individual step */}
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="text-accent">{step.icon}</div>
                  <p className="font-semibold text-neutral text-lg">{step.text}</p>
                </div>

                {/* Arrow separator */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block text-gray-300">
                    <FaLongArrowAltRight size={40} />
                  </div>
                )}
              </React.Fragment>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

// You might need to import React if you get an error
import React from 'react';

export default HowItWorks;