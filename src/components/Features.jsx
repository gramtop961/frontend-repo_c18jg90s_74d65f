import React from 'react';
import { CreditCard, Salad, Dumbbell, Trophy } from 'lucide-react';

const features = [
  {
    icon: CreditCard,
    title: 'Flexible Subscriptions',
    desc: 'Simple membership plans with transparent pricing and perks to match your grind.'
  },
  {
    icon: Salad,
    title: 'Meal Logging',
    desc: 'Track macros and meals with fast, lightweight inputs and smart suggestions.'
  },
  {
    icon: Dumbbell,
    title: 'Exercise Library',
    desc: 'Add every exercise you do and build routines that actually fit your goals.'
  },
  {
    icon: Trophy,
    title: 'PR & Progress',
    desc: 'Record maxes, visualize trends, and celebrate every new milestone.'
  }
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 bg-gradient-to-b from-black via-neutral-950 to-black">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.12),transparent_60%)]" />
      <div className="relative container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Built for consistency
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Lean. Fast. Focused.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className="group relative rounded-2xl border border-red-500/20 bg-neutral-950/60 p-6 backdrop-blur hover:border-red-500/40 transition-colors">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-red-600/15 text-red-400 border border-red-500/30">
                <f.icon />
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-neutral-300 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
