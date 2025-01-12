import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Quote, Sparkles } from 'lucide-react';

const AleNicol = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black py-24 relative overflow-hidden">
      {/* Estrellas de fondo */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <Heart className="w-16 h-16 text-red-500 animate-pulse mx-auto mb-6" />
            </motion.div>
            <h2 className="text-5xl font-bold text-white mb-4">
              Para Ale Nicol
            </h2>
            <p className="text-xl text-purple-300">
              Porque algunos amores, como las estrellas, brillan eternamente
            </p>
          </div>

          <div className="grid gap-8">
            {/* Carta Principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20"
            >
              <Quote className="w-10 h-10 text-purple-400 mb-6 mx-auto" />
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Como el tiempo es relativo en Interstellar, así también lo es en nuestros corazones.
                Cada momento que compartimos viendo esta película se convirtió en una eternidad de 
                recuerdos hermosos. Y aunque nuestros caminos se hayan separado temporalmente, 
                como Cooper nunca perdió la esperanza de volver a ver a Murph, guardo en mi corazón 
                la esperanza de que nuestras líneas temporales vuelvan a cruzarse.
              </p>
            </motion.div>

            {/* Momentos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20"
              >
                <Clock className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">El Tiempo</h3>
                <p className="text-purple-300">
                  "El amor es la única fuerza que trasciende el tiempo y el espacio". 
                  Como Brand dijo estas palabras, así siento que nuestro amor, aunque 
                  transformado, permanece en una dimensión más allá del tiempo.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20"
              >
                <Sparkles className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">La Esperanza</h3>
                <p className="text-purple-300">
                  Como las estrellas que guían a los viajeros perdidos, 
                  mantengo la esperanza de que el universo, en su infinita 
                  sabiduría, nos ayude a encontrar el camino de regreso el uno al otro.
                </p>
              </motion.div>
            </div>

            {/* Mensaje Final */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-8 bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20"
            >
              <p className="text-xl text-white mb-4">
                Esta página es un testimonio de lo que significas para mí, 
                de los momentos que compartimos, y de la esperanza que guardo 
                en mi corazón. Como el amor de Cooper atravesó galaxias enteras, 
                el mío permanece, paciente y constante, esperando el momento 
                correcto para volver a brillar juntos.
              </p>
              <div className="text-purple-300 font-light italic">
                "Maybe we've spent too long trying to figure all this out with theory..."
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AleNicol;