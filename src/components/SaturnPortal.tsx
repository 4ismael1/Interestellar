import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Info, Maximize2, Minimize2 } from 'lucide-react';

const SaturnPortal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const solarSystemRadius = Math.min(centerX, centerY) * 0.8;

    // Configuración de planetas
    const planets = [
      { 
        name: 'Sol', 
        radius: 40, 
        distance: 0,
        color: '#FDB813',
        orbitSpeed: 0,
        glow: true,
        angle: 0 
      },
      { 
        name: 'Mercurio', 
        radius: 5, 
        distance: solarSystemRadius * 0.2,
        color: '#A0522D',
        orbitSpeed: 0.008,
        angle: 0 
      },
      { 
        name: 'Venus', 
        radius: 8, 
        distance: solarSystemRadius * 0.3,
        color: '#DEB887',
        orbitSpeed: 0.006,
        angle: 0 
      },
      { 
        name: 'Tierra', 
        radius: 9, 
        distance: solarSystemRadius * 0.4,
        color: '#4B9CD3',
        orbitSpeed: 0.004,
        angle: 0 
      },
      { 
        name: 'Marte', 
        radius: 6, 
        distance: solarSystemRadius * 0.5,
        color: '#CD5C5C',
        orbitSpeed: 0.003,
        angle: 0 
      },
      { 
        name: 'Júpiter', 
        radius: 20, 
        distance: solarSystemRadius * 0.6,
        color: '#DAA06D',
        orbitSpeed: 0.002,
        angle: 0 
      },
      { 
        name: 'Saturno', 
        radius: 17, 
        distance: solarSystemRadius * 0.7,
        color: '#F4C542',
        orbitSpeed: 0.001,
        hasRings: true,
        angle: 0 
      },
      { 
        name: 'Urano', 
        radius: 12, 
        distance: solarSystemRadius * 0.8,
        color: '#B2FFFF',
        orbitSpeed: 0.0008,
        angle: 0 
      },
      { 
        name: 'Neptuno', 
        radius: 11, 
        distance: solarSystemRadius * 0.9,
        color: '#5B5BFF',
        orbitSpeed: 0.0006,
        angle: 0 
      }
    ];

    // Función para dibujar el agujero de gusano
    const drawWormhole = (x: number, y: number) => {
      const wormholeRadius = 25;
      const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, wormholeRadius * 2
      );
      
      gradient.addColorStop(0, 'rgba(138, 43, 226, 0.8)');
      gradient.addColorStop(0.3, 'rgba(0, 149, 255, 0.6)');
      gradient.addColorStop(0.6, 'rgba(138, 43, 226, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(x, y, wormholeRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Anillos del agujero de gusano
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(x, y, wormholeRadius * (1 + i * 0.2), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(138, 43, 226, ${0.3 / i})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Texto "Agujero de Gusano"
      ctx.font = '14px Arial';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('Agujero de Gusano', x, y + wormholeRadius * 2.5);
    };

    const drawPlanet = (planet: typeof planets[0]) => {
      const x = centerX + Math.cos(planet.angle) * planet.distance;
      const y = centerY + Math.sin(planet.angle) * planet.distance;

      // Dibujar órbita
      ctx.beginPath();
      ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();

      // Dibujar planeta
      ctx.beginPath();
      ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
      
      if (planet.glow) {
        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, planet.radius * 2
        );
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(0.5, `${planet.color}88`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = planet.color;
      }
      
      ctx.fill();

      // Anillos de Saturno
      if (planet.hasRings) {
        ctx.beginPath();
        ctx.ellipse(
          x, y,
          planet.radius * 2,
          planet.radius * 0.5,
          planet.angle,
          0, Math.PI * 2
        );
        ctx.strokeStyle = '#DAA06D';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Si es Saturno, dibuja el agujero de gusano cerca
        const wormholeAngle = planet.angle + Math.PI / 6;
        const wormholeX = centerX + Math.cos(wormholeAngle) * (planet.distance + 50);
        const wormholeY = centerY + Math.sin(wormholeAngle) * (planet.distance + 50);
        drawWormhole(wormholeX, wormholeY);
      }
    };

    let animationFrameId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      planets.forEach(planet => {
        planet.angle += planet.orbitSpeed;
        drawPlanet(planet);
      });

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-16 text-white"
        >
          El Portal de Saturno
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

          {/* Texto agregado debajo de la animación */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto my-8"
          >
            En el universo de Interestelar, Saturno se convierte en un punto clave para la exploración interestelar. 
            Cerca del gigante gaseoso, un agujero de gusano misteriosamente colocado por una civilización avanzada 
            abre una puerta a otra galaxia. Este portal cósmico permite a los exploradores de la Tierra adentrarse 
            en lo desconocido, enfrentando los límites del espacio, el tiempo y la supervivencia humana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showInfo ? 1 : 0, y: showInfo ? 0 : 20 }}
            className={`mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-300 ${
              showInfo ? 'visible' : 'invisible'
            }`}
          >
            <div className="bg-purple-900/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">
                El Descubrimiento
              </h3>
              <p className="text-gray-300">
                En Interstellar, el agujero de gusano fue descubierto cerca de Saturno,
                proporcionando a la humanidad una ruta hacia otra galaxia y posibles
                planetas habitables. Esta anomalía gravitacional representa la esperanza
                de la humanidad para encontrar un nuevo hogar.
              </p>
            </div>

            <div className="bg-purple-900/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">
                La Anomalía
              </h3>
              <p className="text-gray-300">
                El agujero de gusano es una distorsión en el espacio-tiempo que
                permite viajar grandes distancias instantáneamente. Su ubicación
                cerca de Saturno no es coincidencia, ya que fue colocado
                estratégicamente por seres de dimensiones superiores.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SaturnPortal;
