// src/components/landing/Hero.jsx
import Announcement from './Announcement';
import Awards from './Awards';

const Hero = () => {
  return (
    // The main container with the gradient background
    <section className="w-full bg-hero-gradient from-gradient-start to-gradient-end pt-16 pb-16 md:pt-12 md:pb-24">
      <div className="container mx-auto px-4 flex flex-col items-center text-center gap-8">
        
        {/* 1. Announcement Bar */}
        <Announcement />

        {/* 2. Awards Section */}
        <div className="mt-4">
          <Awards />
        </div>

        {/* 3. Main Headline */}
        <div className="mt-6">
          <h1 className="text-5xl md:text-7xl font-medium text-neutral tracking-tighter">
            Find Homes, not listings - based on your
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold text-neutral tracking-tighter mt-1">
            LIFESTYLE, NOT JUST YOUR BUDGET
          </h1>
        </div>

        {/* 4. Sub-headline */}
        <p className="text-neutral/80 text-lg md:text-xl max-w-3xl mt-2">
          We make finding your next home dramatically easier and faster! Get matched listings, tailored recommendations, and neighborhood insights in less than 1 minute.
        </p>

        {/* 5. Call to Action Button */}
        <div className="mt-6">
          <button className="bg-accent text-neutral font-bold text-lg px-10 py-4 rounded-full hover:bg-accent-focus transition-all duration-300 shadow-lg hover:shadow-xl">
            Find My Perfect Match
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;