import React from 'react';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Tracker from './components/Tracker.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <Hero />
      <Features />
      <Tracker />
      <Footer />
    </div>
  );
}
