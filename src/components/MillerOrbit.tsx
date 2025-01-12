import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Orbit, Clock, Rocket, Maximize2, Minimize2, Info } from 'lucide-react';

interface LabelOptions {
  fontSize?: number;
  color?: string;
  background?: boolean;
  align?: 'left' | 'right' | 'center';
}

const MillerOrbit = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let animationFrameId: number;
    let angle = 0;
    let shipAngle = 0;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const orbitRadius = Math.min(centerX, centerY) * 0.6;
    const blackHoleRadius = Math.min(centerX, centerY) * 0.2;

    const drawLabel = (text: string, x: number, y: number, options: LabelOptions = {}) => {
      const {
        fontSize = 14,
        color = 'rgba(255, 255, 255, 0.8)',
        background = false,
        align = 'center'
      } = options;

      ctx.save();
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = color;
      ctx.textAlign = align;

      if (background) {
        const metrics = ctx.measureText(text);
        const padding = 8;
        const bgHeight = fontSize + padding;
        const bgWidth = metrics.width + padding * 2;
        const bgX = align === 'left' ? x : align === 'right' ? x - bgWidth : x - bgWidth / 2;
        const bgY = y - fontSize / 2 - padding / 2;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.roundRect(bgX, bgY, bgWidth, bgHeight, 4);
        ctx.fill();
        ctx.fillStyle = color;
      }

      ctx.fillText(text, x, y);
      ctx.restore();
    };

    const drawOrbit = () => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawBlackHole = () => {
      const gradient = ctx.createRadialGradient(
        centerX, centerY, blackHoleRadius * 0.5,
        centerX, centerY, blackHoleRadius * 1.5
      );
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.5, '#FF6B00');
      gradient.addColorStop(1, 'rgba(255, 107, 0, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleRadius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      drawLabel('Gargantua', centerX, centerY, {
        fontSize: 16,
        color: '#4299E1',
        background: true
      });
      
      drawLabel('Horizonte de Eventos', centerX, centerY + blackHoleRadius + 30, {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        background: true
      });
    };

    const drawPlanet = (angle: number) => {
      const x = centerX + Math.cos(angle) * orbitRadius;
      const y = centerY + Math.sin(angle) * orbitRadius;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
      gradient.addColorStop(0, 'rgba(0, 149, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 149, 255, 0)');

      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#0095FF';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      const labelOffset = 60;
      const labelX = x + (x > centerX ? labelOffset : -labelOffset);
      const labelY = y;
      
      drawLabel('Planeta Miller', labelX, labelY, {
        align: x > centerX ? 'left' : 'right',
        fontSize: 16,
        color: '#4299E1',
        background: true
      });
    };

    const drawSpaceship = (shipAngle: number) => {
      const distance = orbitRadius * 0.8;
      const x = centerX + Math.cos(shipAngle) * distance;
      const y = centerY + Math.sin(shipAngle) * distance;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(shipAngle + Math.PI / 2);

      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(10, 15);
      ctx.lineTo(-10, 15);
      ctx.closePath();
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      const engineGlow = ctx.createRadialGradient(0, 15, 0, 0, 15, 10);
      engineGlow.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
      engineGlow.addColorStop(1, 'rgba(0, 255, 255, 0)');
      ctx.fillStyle = engineGlow;
      ctx.beginPath();
      ctx.arc(0, 15, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      const labelOffset = 50;
      const labelX = x + (x > centerX ? labelOffset : -labelOffset);
      const labelY = y;
      
      drawLabel('Endurance', labelX, labelY, {
        align: x > centerX ? 'left' : 'right',
        fontSize: 16,
        color: '#4299E1',
        background: true
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.globalAlpha = 0.1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, blackHoleRadius * (1 + i * 0.2), 0, Math.PI * 2);
        ctx.strokeStyle = '#4299E1';
        ctx.stroke();
      }
      ctx.restore();

      drawOrbit();
      drawBlackHole();
      drawPlanet(angle);
      drawSpaceship(shipAngle);

      angle += 0.002;
      shipAngle += 0.003;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="min-h-screen bg-black py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-8 text-white"
        >
          Órbita del Planeta Miller
        </motion.h2>

        <div className="relative">
          <div className={`relative mx-auto transition-all duration-700 ${
            isExpanded ? 'w-full max-w-5xl' : 'w-full max-w-3xl'
          }`}>
            <div className="aspect-square relative bg-black/50 rounded-2xl overflow-hidden backdrop-blur-sm">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
              />

              <div className="absolute top-4 right-4 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <Info className="w-6 h-6 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-6 h-6 text-white" />
                  ) : (
                    <Maximize2 className="w-6 h-6 text-white" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showInfo ? 1 : 0, y: showInfo ? 0 : 20 }}
            className={`mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-300 ${
              showInfo ? 'visible' : 'invisible'
            }`}
          >
            <div className="bg-blue-900/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                Dilatación Temporal
              </h3>
              <p className="text-gray-300">
                Cada hora en el planeta Miller equivale a 7 años en la Tierra debido
                a la intensa gravedad de Gargantua. Este fenómeno es conocido como
                dilatación temporal gravitacional, predicho por la Teoría de la
                Relatividad de Einstein.
              </p>
            </div>

            <div className="bg-blue-900/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-blue-400" />
                La Endurance
              </h3>
              <p className="text-gray-300">
                La nave Endurance debe mantener una órbita precisa alrededor de
                Gargantua para minimizar los efectos de la dilatación temporal mientras
                realiza misiones al planeta Miller. Su diseño modular le permite
                adaptarse a las extremas condiciones gravitacionales.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MillerOrbit;