import React from 'react';
import Hero from '../components/sections/Hero';
import Destinations from '../components/sections/Destinations';
import TripsGrid from '../components/sections/TripsGrid';
import Specialists from '../components/sections/Specialists';
import Features from '../components/sections/Features';
import HowItWorks from '../components/sections/HowItWorks';
// import Testimonials from '../components/sections/Testimonials';
import Stats from '../components/sections/Stats';
// import Training from '../components/sections/Training';
// import Gear from '../components/sections/Gear';
// import Seasons from '../components/sections/Seasons';
// import About from '../components/sections/About';
// import Contact from '../components/sections/Contact';
import FAQ from '../components/sections/FAQ';

const Home = () => {
  return (
    <>
      <Hero />
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
        <Destinations />
        <TripsGrid />
        <HowItWorks />
        <Features />
        <Stats />        
        <Specialists />        
        <FAQ />
      </div>
    </>
  );
};

export default Home;
