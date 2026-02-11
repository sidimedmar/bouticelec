import React from 'react';
import { Product, Language } from '../types';
import { Eye } from 'lucide-react';
import { t } from '../translations';

interface ProductCardProps {
  product: Product;
  language: Language;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, language, onAddToCart, onViewDetails }) => {
  const title = language === 'fr' ? product.titleFr : product.titleAr;
  const subtitle = language === 'fr' ? product.subtitleFr : product.subtitleAr;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group">
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
        <img 
          src={product.image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {product.isNew && (
          <span className={`absolute top-2 ${language === 'fr' ? 'left-2' : 'right-2'} bg-mru-yellow text-mru-green text-xs font-bold px-2 py-1 rounded`}>
            {t.new[language]}
          </span>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white text-mru-green px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Eye size={16} /> {t.viewDetails[language]}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow text-start">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4">
          {subtitle}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through mb-1">
                {product.oldPrice} MRU
              </span>
            )}
            <span className="text-xl font-bold text-mru-green">
              {product.price} MRU
            </span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-[#1a5d1a] hover:bg-[#144a14] text-white px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            <span>{t.addToCart[language]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;