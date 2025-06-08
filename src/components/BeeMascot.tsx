
import React, { useState, useEffect } from 'react';

const BeeMascot = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const newY = 20 + (scrollProgress * 60); // Move between 20% and 80% of viewport height
      setPosition(prev => ({ ...prev, y: newY }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    
    // Random movement on click
    setPosition({
      x: Math.random() * 80 + 10, // Between 10% and 90%
      y: Math.random() * 60 + 20, // Between 20% and 80%
    });
  };

  return (
    <div
      className={`fixed z-50 cursor-pointer transition-all duration-1000 ease-out pointer-events-auto ${
        isClicked ? 'animate-bee-bounce' : 'animate-bee-float'
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={handleClick}
    >
      <div className="relative">
        {/* Bee body */}
        <div className="w-8 h-12 bg-gradient-to-b from-ghibli-sunset to-ghibli-warm-brown rounded-full relative">
          {/* Bee stripes */}
          <div className="absolute top-2 left-0 right-0 h-2 bg-ghibli-forest rounded-full opacity-80"></div>
          <div className="absolute top-6 left-0 right-0 h-2 bg-ghibli-forest rounded-full opacity-80"></div>
          
          {/* Wings */}
          <div className="absolute -top-1 -left-2 w-6 h-4 bg-white/60 rounded-full transform -rotate-12 animate-pulse"></div>
          <div className="absolute -top-1 -right-2 w-6 h-4 bg-white/60 rounded-full transform rotate-12 animate-pulse"></div>
          
          {/* Eyes */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-ghibli-forest rounded-full"></div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-ghibli-forest rounded-full"></div>
          
          {/* Antennae */}
          <div className="absolute -top-2 left-2 w-1 h-3 bg-ghibli-forest rounded-full"></div>
          <div className="absolute -top-2 right-2 w-1 h-3 bg-ghibli-forest rounded-full"></div>
          <div className="absolute -top-3 left-1.5 w-1.5 h-1.5 bg-ghibli-sunset rounded-full"></div>
          <div className="absolute -top-3 right-1.5 w-1.5 h-1.5 bg-ghibli-sunset rounded-full"></div>
        </div>
        
        {/* Speech bubble on hover */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-card border rounded-lg px-3 py-1 text-xs font-medium shadow-lg whitespace-nowrap">
            Click me! 🌻
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-border"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeeMascot;
