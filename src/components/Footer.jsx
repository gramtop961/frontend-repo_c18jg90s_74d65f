import React from 'react';

export default function Footer() {
  return (
    <footer className="relative py-10 border-t border-neutral-800 bg-black">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.1),transparent_60%)]" />
      <div className="relative container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-neutral-400 text-sm">© {new Date().getFullYear()} Redline Gym. All rights reserved.</p>
        <div className="flex items-center gap-4 text-neutral-400 text-sm">
          <a className="hover:text-white" href="#features">Features</a>
          <a className="hover:text-white" href="#tracker">Tracker</a>
          <a className="hover:text-white" href="#">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
