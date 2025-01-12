import React from 'react';

const Wormhole = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="relative w-96 h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full animate-spin-slow opacity-75 blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 rounded-full animate-spin-reverse-slow opacity-75 blur-xl"></div>
        <div className="absolute inset-8 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

export default Wormhole;