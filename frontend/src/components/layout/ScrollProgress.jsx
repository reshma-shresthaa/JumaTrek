import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', calculateScrollProgress);
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  return (
    <div 
      className="scroll-progress" 
      id="scrollProgress"
      style={{ width: `${scrollProgress}%` }}
    />
  );
};

export default ScrollProgress;