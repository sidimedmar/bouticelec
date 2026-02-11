import React from 'react';
import { ShoppingCart, User, LayoutDashboard, Store, Globe } from 'lucide-react';
import { Language } from '../types';
import { t } from '../translations';

interface NavbarProps {
  cartCount: number;
  currentView: 'shop' | 'admin';
  language: Language;
  onNavigate: (view: 'shop' | 'admin') => void;
  onToggleLanguage: () => void;
  onOpenCart: () => void;
  isAuthenticated: boolean;
  onAdminClick: () => void;
  storeName: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  currentView, 
  language, 
  onNavigate, 
  onToggleLanguage,
  onOpenCart,
  isAuthenticated,
  onAdminClick,
  storeName
}) => {
  return (
    <nav className="bg-gradient-to-r from-mru-green via-[#a08500] to-mru-red text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('shop')}>
            <span className="font-bold text-xl sm:text-2xl tracking-tight">
              {storeName}
            </span>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-8 items-center font-medium">
            <button 
              onClick={() => onNavigate('shop')}
              className={`flex items-center gap-2 hover:text-mru-yellow transition ${currentView === 'shop' ? 'text-mru-yellow font-bold' : ''}`}
            >
              <Store size={18} />
              {t.shop[language]}
            </button>
            <button 
              onClick={onAdminClick}
              className={`flex items-center gap-2 hover:text-mru-yellow transition ${currentView === 'admin' ? 'text-mru-yellow font-bold' : ''}`}
            >
              <LayoutDashboard size={18} />
              {t.admin[language]}
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button 
              onClick={onToggleLanguage}
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-sm font-semibold transition"
            >
              <Globe size={16} />
              <span>{language === 'fr' ? 'AR' : 'FR'}</span>
            </button>

            {currentView === 'shop' && (
              <button 
                onClick={onOpenCart}
                className="flex items-center bg-white text-mru-green px-4 py-2 rounded-full font-bold shadow-sm hover:bg-gray-100 transition duration-200 relative"
              >
                <ShoppingCart size={20} className={language === 'fr' ? "mr-2" : "ml-2"} />
                <span>{t.cart[language]}</span>
                {cartCount > 0 && (
                  <span className={`absolute -top-1 ${language === 'fr' ? '-right-1' : '-left-1'} bg-mru-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-mru-green`}>
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            {currentView === 'admin' && (
              <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full text-sm">
                <User size={16} />
                <span>{isAuthenticated ? t.adminName[language] : ''}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;