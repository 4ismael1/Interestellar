import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Rocket, Clock, Zap, Gauge } from 'lucide-react';

interface TravelReport {
  maxSpeed: number;
  duration: number;
  distanceTraveled: number;
  anomalies: string[];
  timeDistortion: number;
  energyConsumption: number;
}

const WormholeTravel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isJumping, setIsJumping] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showReport, setShowReport] = useState(false);
  const [travelReport, setTravelReport] = useState<TravelReport | null>(null);

  const generateRandomReport = (): TravelReport => {
    const possibleAnomalies = [
      "Fluctuación cuántica detectada en el sector 7",
      "Perturbación gravitacional menor en el horizonte de eventos",
      "Interferencia temporal en la matriz de navegación",
      "Eco dimensional registrado en los sensores",
      "Resonancia harmónica en el campo de contención",
      "Variación en la densidad del espacio-tiempo",
      "Pulso electromagnético no identificado",
      "Patrón de ondas gravitacionales inusual",
      "Distorsión temporal localizada",
      "Singularidad cuántica momentánea"
    ];

    const numAnomalies = Math.floor(Math.random() * 3) + 1;
    const selectedAnomalies = [];
    for (let i = 0; i < numAnomalies; i++) {
      const index = Math.floor(Math.random() * possibleAnomalies.length);
      selectedAnomalies.push(possibleAnomalies[index]);
      possibleAnomalies.splice(index, 1);
    }

    return {
      maxSpeed: Number((Math.random() * 2 + 4).toFixed(2)), // Entre 4 y 6 veces la velocidad de la luz
      duration: Number((Math.random() * 10 + 5).toFixed(2)), // Entre 5 y 15 segundos
      distanceTraveled: Math.floor(Math.random() * 500000) + 500000, // Entre 500,000 y 1,000,000 años luz
      anomalies: selectedAnomalies,
      timeDistortion: Number((Math.random() * 5 + 1).toFixed(2)), // Factor de 1 a 6
      energyConsumption: Math.floor(Math.random() * 50) + 50 // Entre 50% y 100%
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Array<{ x: number; y: number; z: number; color: string }> = [];
    const numStars = 2000;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1500,
        color: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 40 + 60}%)`,
      });
    }

    let animationFrameId: number;
    let wormholeRadius = 0;
    let distortion = 0;
    let rotation = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (isJumping) {
        wormholeRadius = Math.min(wormholeRadius + 2, Math.max(canvas.width, canvas.height));
        distortion = Math.min(distortion + 0.02, 1);
        rotation += 0.02;
      } else {
        wormholeRadius = Math.max(wormholeRadius - 2, 0);
        distortion = Math.max(distortion - 0.02, 0);
      }

      if (wormholeRadius > 0) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);
        ctx.translate(-centerX, -centerY);

        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, wormholeRadius
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.3, 'rgba(138, 43, 226, 0.2)');
        gradient.addColorStop(0.6, 'rgba(0, 149, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0.1)');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, wormholeRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Añadir anillos concéntricos
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, wormholeRadius * (0.2 + i * 0.2), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(138, 43, 226, ${0.1 - i * 0.02})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.restore();
      }

      stars.forEach((star) => {
        star.z -= speed * 10;

        if (star.z < 1) {
          star.z = 1500;
          star.x = Math.random() * canvas.width - centerX;
          star.y = Math.random() * canvas.height - centerY;
        }

        let k = 128.0 / star.z;
        if (distortion > 0) {
          const distance = Math.sqrt(star.x * star.x + star.y * star.y);
          const angle = Math.atan2(star.y, star.x) + rotation * distortion;
          const distortionFactor = 1 + (distance * distortion * 0.001);
          star.x = Math.cos(angle) * distance * distortionFactor;
          star.y = Math.sin(angle) * distance * distortionFactor;
          k *= (1 + distortion);
        }

        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z / 1500) * 3;
          ctx.beginPath();
          ctx.fillStyle = star.color;
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();

          if (speed > 2) {
            ctx.beginPath();
            ctx.strokeStyle = star.color;
            ctx.lineWidth = size / 2;
            ctx.moveTo(px, py);
            const streakLength = speed * 5;
            const angle = Math.atan2(star.y, star.x) + rotation;
            ctx.lineTo(
              px - streakLength * Math.cos(angle),
              py - streakLength * Math.sin(angle)
            );
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, isJumping]);

  const initiateJump = () => {
    setIsJumping(true);
    setShowReport(false);
    const acceleration = setInterval(() => {
      setSpeed((prev) => {
        if (prev >= 5) {
          clearInterval(acceleration);
          setTimeout(() => {
            setIsJumping(false);
            setSpeed(1);
            setTravelReport(generateRandomReport());
            setShowReport(true);
          }, 5000);
          return 5;
        }
        return prev + 0.1;
      });
    }, 50);
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <AnimatePresence>
        {!isJumping && !showReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 container mx-auto px-4 py-24"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-5xl font-bold text-white mb-4 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 mr-4 text-blue-400" />
                  Viaje por el Agujero de Gusano
                </h2>
                <p className="text-xl text-gray-300">
                  Experimenta el viaje interestelar a través del agujero de gusano
                </p>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-black/60 backdrop-blur-lg rounded-xl p-8 text-center"
              >
                <div className="flex justify-center mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={initiateJump}
                    className="flex items-center space-x-3 px-8 py-4 rounded-full text-xl font-bold
                      bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                      transition-all duration-300 transform"
                  >
                    <Rocket className="w-6 h-6" />
                    <span>Iniciar Viaje</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="bg-blue-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-3 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-blue-400" />
                      Velocidad Actual
                    </h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${(speed / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono">{speed.toFixed(1)}x</span>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-3">Estado del Viaje</h3>
                    <p className="text-gray-300">
                      Listo para iniciar el viaje interestelar
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {showReport && travelReport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 container mx-auto px-4 py-24"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-black/60 backdrop-blur-lg rounded-xl p-8"
              >
                <h3 className="text-3xl font-bold text-white mb-8 text-center">Reporte de Viaje Interestelar</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-900/20 rounded-lg p-6">
                    <h4 className="text-xl font-bold mb-4 flex items-center text-blue-400">
                      <Gauge className="w-5 h-5 mr-2" />
                      Datos de Velocidad
                    </h4>
                    <div className="space-y-3">
                      <p className="text-gray-300">
                        Velocidad Máxima: <span className="text-white font-bold">{travelReport.maxSpeed}c</span>
                      </p>
                      <p className="text-gray-300">
                        Duración: <span className="text-white font-bold">{travelReport.duration}s</span>
                      </p>
                      <p className="text-gray-300">
                        Distancia: <span className="text-white font-bold">{travelReport.distanceTraveled.toLocaleString()} años luz</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 rounded-lg p-6">
                    <h4 className="text-xl font-bold mb-4 flex items-center text-blue-400">
                      <Clock className="w-5 h-5 mr-2" />
                      Efectos Temporales
                    </h4>
                    <div className="space-y-3">
                      <p className="text-gray-300">
                        Factor de Dilatación: <span className="text-white font-bold">{travelReport.timeDistortion}x</span>
                      </p>
                      <p className="text-gray-300">
                        Energía Consumida: <span className="text-white font-bold">{travelReport.energyConsumption}%</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-lg p-6 mb-8">
                  <h4 className="text-xl font-bold mb-4 flex items-center text-blue-400">
                    <Zap className="w-5 h-5 mr-2" />
                    Anomalías Detectadas
                  </h4>
                  <ul className="space-y-2">
                    {travelReport.anomalies.map((anomaly, index) => (
                      <li key={index} className="text-gray-300 flex items-start">
                        <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-purple-500" />
                        {anomaly}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowReport(false);
                      setTravelReport(null);
                    }}
                    className="px-8 py-3 rounded-full text-white font-bold
                      bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Realizar Otro Viaje
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WormholeTravel;