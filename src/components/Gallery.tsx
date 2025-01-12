import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  title: string;
}

const photos: Photo[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
    title: "Nebulosa Espacial"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a",
    title: "Vía Láctea"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7",
    title: "Galaxia Espiral"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    title: "Estrellas Distantes"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
    title: "Constelación"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1464802686167-b939a6910659",
    title: "Aurora Espacial"
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0",
    title: "Polvo Estelar"
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031",
    title: "Nebulosa Azul"
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1465101162946-4377e57745c3",
    title: "Campo Estelar"
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45",
    title: "Galaxia Lejana"
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78",
    title: "Nebulosa Púrpura"
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3",
    title: "Cúmulo Estelar"
  }
];

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handlePrevious = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const previousPhoto = photos[currentIndex - 1] || photos[photos.length - 1];
    setSelectedPhoto(previousPhoto);
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const nextPhoto = photos[currentIndex + 1] || photos[0];
    setSelectedPhoto(nextPhoto);
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  return (
    <section className="min-h-screen bg-black py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-16 text-white"
        >
          Galería Espacial
        </motion.h2>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {photos.map(photo => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: loadedImages.has(photo.id) ? 1 : 0,
                scale: loadedImages.has(photo.id) ? 1 : 0.8
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="relative group cursor-pointer aspect-square"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="absolute inset-0 rounded-lg overflow-hidden bg-blue-900/20">
                <img
                  src={photo.url}
                  alt={photo.title}
                  onLoad={() => handleImageLoad(photo.id)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {photo.title}
                </motion.h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-7xl w-full aspect-video"
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain rounded-lg"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(null);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-2xl font-bold bg-black/50 px-6 py-2 rounded-full"
                >
                  {selectedPhoto.title}
                </motion.h3>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;