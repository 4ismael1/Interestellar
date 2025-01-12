import React from 'react';
import { Rocket, Brain, Clock, Heart } from 'lucide-react';

const Navigation = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a href="#" className="flex items-center space-x-2 text-xl font-bold">
              <Rocket className="w-6 h-6" />
              <span>Interstellar</span>
            </a>
            <div className="hidden md:flex space-x-8">
              <NavLink icon={Clock} text="Planeta Miller" onClick={() => scrollToSection('planet-miller')} />
              <NavLink icon={Brain} text="Curiosidades" onClick={() => scrollToSection('curiosidades')} />
              <NavLink icon={Heart} text="Ale Nicol" onClick={() => scrollToSection('ale-nicol')} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ icon: Icon, text, onClick }: { icon: any; text: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
  >
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </button>
);

export default Navigation;