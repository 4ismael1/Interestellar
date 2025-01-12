import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import Wormhole from './components/Wormhole';
import ParallaxStars from './components/ParallaxStars';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PlanetMiller from './components/PlanetMiller';
import Curiosidades from './components/Curiosidades';
import Gargantua from './components/Gargantua';
import WormholeTravel from './components/WormholeTravel';
import MillerOrbit from './components/MillerOrbit';
import SaturnPortal from './components/SaturnPortal';
import AleNicol from './components/AleNicol';
import AudioPlayer from './components/AudioPlayer';
import Gallery from './components/Gallery';

function App() {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setShowWelcome(false);
    setAudioStarted(true);
  };

  if (loading) {
    return <Wormhole />;
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <ParallaxStars />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center z-10 p-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <Heart className="w-16 h-16 text-red-500 mx-auto" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
            Con mucho amor
          </h1>
          <p className="text-gray-400 text-xl mb-8">Att: Ismael</p>
          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Dame click para comenzar
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {audioStarted && <AudioPlayer autoplay />}
      <ParallaxStars />
      <Navigation />
      <Hero />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="wormhole-travel"
      >
        <WormholeTravel />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="planet-miller"
      >
        <PlanetMiller />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <MillerOrbit />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="curiosidades"
      >
        <Curiosidades />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SaturnPortal />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Gargantua />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Gallery />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="ale-nicol"
      >
        <AleNicol />
      </motion.div>
      
      <footer className="text-center py-8 text-gray-500">
        <p>© 2025 Ismael Paulino</p>
      </footer>
    </div>
  );
}

export default App;