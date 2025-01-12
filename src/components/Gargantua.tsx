import React, { useEffect, useRef, useState } from 'react';
import { Orbit, Atom, Maximize2, Minimize2 } from 'lucide-react';

const Gargantua = () => {
  const blackHoleRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!blackHoleRef.current) return;
    const rect = blackHoleRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-blue-950 py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Gargantúa: El Agujero Negro
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <Orbit className="w-6 h-6 text-blue-400" />
            <p className="text-xl text-gray-300">
              Explorando los límites del espacio-tiempo
            </p>
          </div>
        </div>

        {/* Interactive Black Hole Visualization */}
        <div 
          ref={blackHoleRef}
          className={`relative mx-auto mb-16 transition-all duration-700 ${
            isExpanded ? 'w-full max-w-5xl' : 'w-full max-w-2xl'
          }`}
          onMouseMove={handleMouseMove}
        >
          <div className="aspect-square relative">
            {/* Accretion Disk */}
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 animate-spin-slow opacity-75 blur-sm"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
              }}
            />
            
            {/* Event Horizon */}
            <div 
              className="absolute inset-8 rounded-full bg-black shadow-[0_0_100px_rgba(0,0,0,0.8)]"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/20 rounded-full" />
            </div>

            {/* Gravitational Lensing Effect */}
            <div className="absolute inset-0 animate-pulse opacity-30">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-blue-500/20"
                  style={{
                    transform: `scale(${1 + i * 0.1}) perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="w-6 h-6 text-white" />
              ) : (
                <Maximize2 className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Scientific Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-blue-950/50 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Atom className="w-6 h-6 mr-2 text-blue-400" />
              Datos Científicos
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-blue-400" />
                <p>Masa: Aproximadamente 100 millones de veces la masa del Sol</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-blue-400" />
                <p>Velocidad de rotación: Cerca del 99.8% de la velocidad de la luz</p>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 mr-2 rounded-full bg-blue-400" />
                <p>Radio del horizonte de eventos: 300 millones de kilómetros</p>
              </li>
            </ul>
          </div>

          <div className="bg-blue-950/50 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              Efectos Relativistas
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                La inmensa gravedad de Gargantúa distorsiona el espacio-tiempo,
                creando efectos visuales únicos como el lente gravitacional y la
                dilatación temporal.
              </p>
              <p>
                Su disco de acreción gira a velocidades relativistas, creando
                patrones de luz y color espectaculares debido al efecto Doppler
                relativista.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gargantua;