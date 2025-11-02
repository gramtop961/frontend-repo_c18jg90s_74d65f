import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline 
          scene="https://prod.spline.design/QrI46EbSvyxcmozb/scene.splinecode" 
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle black-red gradient overlay for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-300 rounded-full px-4 py-2 mb-6 backdrop-blur">
          <Rocket size={18} />
          <span className="text-sm tracking-wide">Power your grind</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
          Redline Gym
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Train. Fuel. Track. PR.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-neutral-300">
          A sleek, animated hub for your gym life — subscriptions, meals, exercises, and personal records in one place.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <a href="#tracker" className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-500 transition-colors font-semibold">Start Tracking</a>
          <a href="#features" className="px-6 py-3 rounded-lg border border-red-500/50 hover:border-red-400/80 text-red-300 transition-colors">Explore Features</a>
        </div>
      </div>
    </section>
  );
}
