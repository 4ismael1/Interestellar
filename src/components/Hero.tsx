import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 p-4"
      >
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          Interstellar
        </h1>
        <h2 className="text-2xl text-gray-300">
          Dedicada a Ale Nicol
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explorando las maravillas del cosmos desde Interstellar
        </p>
        <div className="flex justify-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('wormhole-travel')}
            className="group relative px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Explorar el Universo
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('curiosidades')}
            className="px-8 py-3 border-2 border-purple-500 hover:border-purple-400 rounded-full transition-colors"
          >
            Curiosidades
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;