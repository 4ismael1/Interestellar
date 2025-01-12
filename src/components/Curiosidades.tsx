import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Brain, Award, ArrowRight, ArrowLeft, Play, X } from 'lucide-react';

interface TriviaItem {
  id: number;
  title: string;
  subtitle: string;
  content: string[];
  image: string;
  icon: React.ElementType;
  stats: { label: string; value: string }[];
}

const triviaData: TriviaItem[] = [
  {
    id: 1,
    title: "Efectos Visuales Revolucionarios",
    subtitle: "La ciencia detrás de Gargantúa",
    content: [
      "El equipo de efectos visuales trabajó con el físico Kip Thorne para crear la visualización más precisa de un agujero negro jamás vista en el cine.",
      "El renderizado de algunas escenas tomó hasta 100 horas por frame, generando más de 800 terabytes de datos.",
      "El software DNGR (Double Negative Gravitational Renderer) fue desarrollado específicamente para simular el comportamiento preciso de la luz alrededor de un agujero negro supermasivo."
    ],
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
    icon: Film,
    stats: [
      { label: "Tiempo de render por frame", value: "100h" },
      { label: "Datos generados", value: "800TB" },
      { label: "Premios VFX", value: "Oscar" }
    ]
  },
  {
    id: 2,
    title: "La Ciencia Real",
    subtitle: "Teorías y precisión científica",
    content: [
      "Kip Thorne, ganador del Premio Nobel, aseguró que toda la ciencia en la película está basada en teorías reales o especulaciones científicas razonables.",
      "La representación de la dilatación temporal en el planeta Miller está basada en cálculos precisos sobre los efectos gravitacionales cerca de un agujero negro supermasivo.",
      "El concepto del agujero de gusano está basado en soluciones reales de las ecuaciones de Einstein que permiten, teóricamente, crear atajos a través del espacio-tiempo."
    ],
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7",
    icon: Brain,
    stats: [
      { label: "Precisión científica", value: "95%" },
      { label: "Ecuaciones usadas", value: "800+" },
      { label: "Asesores científicos", value: "12" }
    ]
  },
  {
    id: 3,
    title: "Detrás de Cámaras",
    subtitle: "La producción de Interstellar",
    content: [
      "Christopher Nolan utilizó mínimos efectos CGI, construyendo sets físicos enormes incluyendo la nave Endurance completa.",
      "Las escenas en el planeta Miller fueron filmadas en Islandia, mientras que las escenas del planeta Mann se rodaron en Glaciar Svínafellsjökull.",
      "La música de Hans Zimmer fue compuesta antes de que se filmara la película, algo inusual en la industria del cine."
    ],
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a",
    icon: Award,
    stats: [
      { label: "Presupuesto", value: "$165M" },
      { label: "Duración rodaje", value: "4 meses" },
      { label: "Locaciones", value: "6 países" }
    ]
  }
];

const Curiosidades = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % triviaData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + triviaData.length) % triviaData.length);
  };

  const CurrentIcon = triviaData[currentIndex].icon;

  return (
    <section className="min-h-screen bg-black py-24 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-16 text-white"
        >
          Curiosidades de Interstellar
        </motion.h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Image Section */}
              <div className="relative group">
                <motion.div
                  className="relative rounded-2xl overflow-hidden aspect-[16/9]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={triviaData[currentIndex].image}
                    alt={triviaData[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center space-x-3 text-white/80">
                      <CurrentIcon className="w-6 h-6" />
                      <span className="text-sm uppercase tracking-wider">
                        {triviaData[currentIndex].subtitle}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Content Section */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-3xl font-bold text-white">
                    {triviaData[currentIndex].title}
                  </h3>
                  
                  <div className="space-y-4">
                    {triviaData[currentIndex].content.map((paragraph, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="text-gray-300"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {triviaData[currentIndex].stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/5 rounded-lg p-4 backdrop-blur-sm"
                    >
                      <div className="text-2xl font-bold text-purple-400">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </motion.button>
                  
                  <div className="flex space-x-2">
                    {triviaData.map((_, idx) => (
                      <motion.div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          idx === currentIndex ? 'bg-purple-500' : 'bg-white/20'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setCurrentIndex(idx)}
                      />
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Curiosidades;