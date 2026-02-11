import React from 'react';
import { X, Check, Package, ShieldCheck, Ruler } from 'lucide-react';
import { Product, Language } from '../types';
import { t } from '../translations';

interface ProductDetailsModalProps {
  product: Product;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, language, isOpen, onClose, onAddToCart }) => {
  if (!isOpen) return null;

  const title = language === 'fr' ? product.titleFr : product.titleAr;
  const subtitle = language === 'fr' ? product.subtitleFr : product.subtitleAr;
  const sellingPoint = language === 'fr' ? product.sellingPointFr : product.sellingPointAr;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-start overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
          <div className={`absolute top-0 ${language === 'fr' ? 'right-0' : 'left-0'} pt-4 px-4 z-10`}>
            <button onClick={onClose} className="bg-white/80 rounded-full p-1 text-gray-600 hover:text-gray-900 focus:outline-none">
              <span className="sr-only">Fermer</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                {/* Image Header */}
                <div className="relative h-64 w-full">
                  <img 
                    src={product.image} 
                    alt={title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                     <h3 className="text-2xl font-bold text-white">{title}</h3>
                     <p className="text-gray-200 text-sm">{subtitle}</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Marketing Section */}
                  <div className={`mb-6 bg-mru-yellow/10 ${language === 'fr' ? 'border-l-4' : 'border-r-4'} border-mru-yellow p-4 rounded-r-lg`}>
                    <h4 className="font-bold text-mru-green flex items-center gap-2 mb-1">
                      <span className="text-xl">💡</span> {t.expertOpinion[language]}
                    </h4>
                    <p className="text-gray-800 italic">{sellingPoint}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Technical Details */}
                    <div>
                      <h4 className="font-bold text-gray-900 border-b pb-2 mb-3">{t.features[language]}</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <Check className={`h-4 w-4 text-mru-green mt-0.5 ${language === 'fr' ? 'mr-2' : 'ml-2'} flex-shrink-0`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Logistics & Info */}
                    <div>
                      <h4 className="font-bold text-gray-900 border-b pb-2 mb-3">{t.logistics[language]}</h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center text-gray-600">
                          <Package className={`h-4 w-4 ${language === 'fr' ? 'mr-2' : 'ml-2'} text-gray-400`} />
                          <span>{t.packaging[language]}: {product.packaging}</span>
                        </li>
                        {product.warranty && (
                          <li className="flex items-center text-gray-600">
                            <ShieldCheck className={`h-4 w-4 ${language === 'fr' ? 'mr-2' : 'ml-2'} text-gray-400`} />
                            <span>{t.warranty[language]}: {product.warranty}</span>
                          </li>
                        )}
                        {product.sizeGuide && (
                          <li className="flex items-center text-gray-600">
                            <Ruler className={`h-4 w-4 ${language === 'fr' ? 'mr-2' : 'ml-2'} text-gray-400`} />
                            <span>{t.sizeGuide[language]}: {product.sizeGuide}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing & Action */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      {product.oldPrice && (
                        <span className="text-gray-400 line-through text-lg mr-2">
                          {product.oldPrice} MRU
                        </span>
                      )}
                      <span className="text-3xl font-extrabold text-mru-green">
                        {product.price} MRU
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                      className="w-full sm:w-auto bg-mru-green hover:bg-[#144a14] text-white px-8 py-3 rounded-lg font-bold shadow-lg transform transition hover:-translate-y-0.5"
                    >
                      {t.addToCartFull[language]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;