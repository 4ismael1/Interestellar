import React, { useEffect } from 'react';

const ParallaxStars = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const stars = document.querySelectorAll('.star');
      const x = e.clientX;
      const y = e.clientY;

      stars.forEach((star) => {
        const speed = (star as HTMLElement).dataset.speed || '1';
        const moveX = (x * parseInt(speed)) / 100;
        const moveY = (y * parseInt(speed)) / 100;
        (star as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="star absolute w-1 h-1 bg-white rounded-full"
          data-speed={Math.random() * 5}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random(),
            animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxStars;