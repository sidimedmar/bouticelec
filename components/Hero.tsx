import React from 'react';
import { t } from '../translations';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ language, title, subtitle }) => {
  return (
    <div className="relative bg-gradient-to-r from-mru-green via-mru-yellow to-mru-red py-24 sm:py-32">
      <div className="absolute inset-0 bg-black/10"></div> {/* Subtle overlay for text contrast */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-md">
          {title}
        </h1>
        <p className="text-xl sm:text-2xl mb-10 font-medium drop-shadow-sm max-w-3xl mx-auto">
          {subtitle}
        </p>
        <a 
          href="#products"
          className="inline-block bg-white text-mru-green font-bold text-lg px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transform hover:-translate-y-1 transition duration-200"
        >
          {t.browse[language]}
        </a>
      </div>
    </div>
  );
};

export default Hero;