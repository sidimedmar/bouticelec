import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem, Language } from '../types';
import { t } from '../translations';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  language: Language;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  whatsappNumber: string;
}

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  language, 
  onUpdateQuantity, 
  onRemoveItem,
  whatsappNumber
}) => {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    // Generate WhatsApp message
    let message = `Bonjour, je voudrais commander:\n\n`;
    cart.forEach(item => {
      message += `- ${item.titleFr} x${item.quantity} (${item.price * item.quantity} MRU)\n`;
    });
    message += `\nTotal: ${total} MRU`;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose}
          aria-hidden="true"
        ></div>

        <div className={`fixed inset-y-0 ${language === 'fr' ? 'right-0' : 'left-0'} max-w-full flex`}>
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                    {t.yourCart[language]}
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button onClick={onClose} className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    {cart.length === 0 ? (
                      <div className="text-center py-10 flex flex-col items-center text-gray-500">
                        <ShoppingBag size={48} className="mb-4 text-gray-300" />
                        <p>{t.emptyCart[language]}</p>
                        <button 
                          onClick={onClose}
                          className="mt-4 text-mru-green font-bold hover:underline"
                        >
                          {t.continueShopping[language]}
                        </button>
                      </div>
                    ) : (
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cart.map((item) => (
                          <li key={item.id} className="py-6 flex">
                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                              <img
                                src={item.image}
                                alt={language === 'fr' ? item.titleFr : item.titleAr}
                                className="w-full h-full object-center object-cover"
                              />
                            </div>

                            <div className={`ml-4 flex-1 flex flex-col ${language === 'ar' ? 'mr-4 ml-0 text-right' : ''}`}>
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{language === 'fr' ? item.titleFr : item.titleAr}</h3>
                                  <p className="ml-4">{item.price * item.quantity} MRU</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {language === 'fr' ? item.category : item.category}
                                </p>
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <div className="flex items-center border rounded-md">
                                  <button 
                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                    className="p-1 hover:bg-gray-100 disabled:opacity-50"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="px-2 font-medium">{item.quantity}</span>
                                  <button 
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="p-1 hover:bg-gray-100"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>

                                <button 
                                  type="button" 
                                  onClick={() => onRemoveItem(item.id)}
                                  className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6 bg-gray-50">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>{t.total[language]}</p>
                    <p>{total} MRU</p>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-mru-green hover:bg-[#144a14]"
                    >
                      {t.checkout[language]}
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      <button
                        type="button"
                        className="text-mru-green font-medium hover:text-[#144a14]"
                        onClick={onClose}
                      >
                        {t.continueShopping[language]}
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;