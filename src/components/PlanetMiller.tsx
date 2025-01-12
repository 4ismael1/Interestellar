import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Waves, AlertTriangle, Gauge, Hourglass } from 'lucide-react';

const PlanetMiller = () => {
  const [earthTime, setEarthTime] = useState<number>(0);
  const [millerTime, setMillerTime] = useState<number>(0);
  const MOVIE_RELEASE_DATE = new Date('2014-11-07').getTime();
  const MILLER_TIME_DILATION = 1.25;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeSinceRelease = (now - MOVIE_RELEASE_DATE) / 1000;
      setEarthTime(timeSinceRelease * MILLER_TIME_DILATION);
      const millerHours = timeSinceRelease / (7 * 365 * 24 * 3600);
      setMillerTime(millerHours);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatEarthTime = (seconds: number) => {
    const years = Math.floor(seconds / (365 * 24 * 60 * 60));
    const days = Math.floor((seconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${years} años, ${days} días, ${hours}:${minutes}:${remainingSeconds}`;
  };

  const formatMillerTime = (hours: number) => {
    const totalHours = Math.floor(hours);
    const minutes = Math.floor((hours % 1) * 60);
    const seconds = Math.floor(((hours % 1) * 60 % 1) * 60);

    return `${totalHours} horas, ${minutes} minutos, ${seconds} segundos`;
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-blue-900 to-black">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, 
                transparent 0%, 
                rgba(0,149,255,${0.1 - i * 0.02}) 50%, 
                transparent 100%)`,
              animation: `wave ${12 + i * 2}s infinite ease-in-out`,
              transform: `translateY(${i * 20}%)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Planeta Miller
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center space-x-2 text-blue-400"
            >
              <Waves className="w-6 h-6" />
              <span className="text-xl">Donde el tiempo es relativo</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Time Display Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-900/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20"
            >
              <div className="flex items-center space-x-4 mb-6">
                <Clock className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Tiempo en la Tierra</h3>
              </div>
              <div className="text-3xl font-mono text-blue-300 mb-4">
                {formatEarthTime(earthTime)}
              </div>
              <div className="flex items-center space-x-2 text-blue-400/80">
                <Hourglass className="w-5 h-5" />
                <span>Tiempo transcurrido desde el estreno de Interstellar</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-blue-900/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20"
            >
              <div className="flex items-center space-x-4 mb-6">
                <Gauge className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Tiempo en Miller</h3>
              </div>
              <div className="text-3xl font-mono text-blue-300 mb-4">
                {formatMillerTime(millerTime)}
              </div>
              <div className="flex items-center space-x-2 text-blue-400/80">
                <AlertTriangle className="w-5 h-5" />
                <span>1 hora en Miller = 7 años en la Tierra</span>
              </div>
            </motion.div>
          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20"
            >
              <h4 className="text-xl font-bold text-white mb-4">Dilatación Temporal</h4>
              <p className="text-gray-300 leading-relaxed">
                Debido a la intensa gravedad del agujero negro Gargantúa, 
                el tiempo transcurre de manera diferente en el planeta Miller.
                Este fenómeno está predicho por la Teoría de la Relatividad de Einstein.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20"
            >
              <h4 className="text-xl font-bold text-white mb-4">Las Olas Gigantes</h4>
              <p className="text-gray-300 leading-relaxed">
                Las enormes olas en el planeta Miller son causadas por la 
                fuerza gravitacional del agujero negro cercano, creando 
                mareas extremas que hacen el planeta casi inhabitable.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20 md:col-span-2 lg:col-span-1"
            >
              <h4 className="text-xl font-bold text-white mb-4">Impacto en la Misión</h4>
              <p className="text-gray-300 leading-relaxed">
                Cada minuto en la superficie del planeta equivale a años de tiempo 
                en la Tierra, lo que hace que la exploración sea extremadamente 
                arriesgada y requiera una precisión milimétrica en su ejecución.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlanetMiller;