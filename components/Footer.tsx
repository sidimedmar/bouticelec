import React from 'react';

interface FooterProps {
  text: string;
  whatsapp: string;
}

const Footer: React.FC<FooterProps> = ({ text, whatsapp }) => {
  return (
    <footer className="bg-[#1a5d1a] text-white py-8 border-t border-[#f0c419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-2">{text}</p>
        <p className="text-sm opacity-80">Contact WhatsApp: +{whatsapp}</p>
      </div>
    </footer>
  );
};

export default Footer;