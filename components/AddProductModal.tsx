import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Upload } from 'lucide-react';
import { Product, Language } from '../types';
import { t } from '../translations';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  language: Language;
  initialData?: Product | null;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave, language, initialData }) => {
  // Default empty state
  const defaultState: Partial<Product> = {
    category: 'High-Tech',
    features: [],
    isNew: true,
    stock: 10,
    stockAlert: 5,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'
  };

  const [formData, setFormData] = useState<Partial<Product>>(defaultState);
  const [featureInput, setFeatureInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill data if editing (initialData exists)
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData(defaultState);
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: objectUrl }));
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleFr || !formData.price) return;
    
    // Create full product object
    const productToSave = {
      ...formData,
      // Default empty strings for Arabic if not provided to avoid undefined issues
      titleAr: formData.titleAr || formData.titleFr,
      subtitleAr: formData.subtitleAr || formData.subtitleFr,
      sellingPointAr: formData.sellingPointAr || formData.sellingPointFr,
      id: initialData ? initialData.id : Date.now(),
    } as Product;

    onSave(productToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-start overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full">
          <form onSubmit={handleSubmit} className="bg-gray-50">
            {/* Header */}
            <div className="bg-mru-green px-4 py-3 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-white">
                {initialData ? t.editProduct[language] : t.addProduct[language]}
              </h3>
              <button type="button" onClick={onClose} className="text-white hover:text-gray-200">
                <X size={24} />
              </button>
            </div>

            <div className="px-4 py-5 sm:p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                
                {/* Image Upload Section */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.imageLabel[language]}</label>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={formData.image} 
                      alt="Aperçu" 
                      className="h-24 w-24 object-cover rounded-md border border-gray-300 bg-white"
                    />
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        ref={fileInputRef}
                      />
                      <div className="flex flex-col gap-2">
                        <button 
                          type="button" 
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-fit"
                        >
                          <Upload size={16} className={language === 'fr' ? "mr-2" : "ml-2"} />
                          {t.upload[language]}
                        </button>
                        <input 
                          type="text" 
                          name="image" 
                          placeholder={t.orUrl[language]}
                          value={formData.image} 
                          onChange={handleChange} 
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-mru-green focus:ring-mru-green sm:text-sm p-2 border" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">{t.category[language]}</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mru-green focus:ring-mru-green sm:text-sm p-2 border">
                    <option>High-Tech</option>
                    <option>Mode</option>
                    <option>Maison</option>
                    <option>Beauté</option>
                  </select>
                </div>
                
                 <div className="col-span-1 flex items-center pt-6">
                  <input type="checkbox" name="isNew" checked={formData.isNew} onChange={(e) => setFormData({...formData, isNew: e.target.checked})} className="h-4 w-4 text-mru-green focus:ring-mru-green border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-900">{t.markNew[language]}</label>
                </div>

                {/* French Details */}
                <div className="col-span-1 bg-white p-3 rounded shadow-sm border border-gray-100" dir="ltr">
                  <h4 className="font-bold text-gray-500 mb-2">{t.frenchSection[language]}</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700">Titre</label>
                      <input required type="text" name="titleFr" value={formData.titleFr || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-1 border" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700">Sous-titre</label>
                      <input type="text" name="subtitleFr" value={formData.subtitleFr || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-1 border" />
                    </div>
                    <div>
                       <label className="block text-xs font-medium text-gray-700">Argument Vente</label>
                       <textarea name="sellingPointFr" value={formData.sellingPointFr || ''} onChange={handleChange} rows={2} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-1 border"></textarea>
                    </div>
                  </div>
                </div>

                {/* Arabic Details */}
                <div className="col-span-1 bg-white p-3 rounded shadow-sm border border-gray-100" dir="rtl">
                  <h4 className="font-bold text-gray-500 mb-2 text-right">{t.arabicSection[language]}</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700">العنوان</label>
                      <input type="text" name="titleAr" value={formData.titleAr || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-1 border" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700">العنوان الفرعي</label>
                      <input type="text" name="subtitleAr" value={formData.subtitleAr || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-1 border" />
                    </div>
                    <div>
                       <label className="block text-xs font-medium text-gray-700">نقطة البيع</label>
                       <textarea name="sellingPointAr" value={formData.sellingPointAr || ''} onChange={handleChange} rows={2} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-1 border"></textarea>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">{t.price[language]} (MRU)</label>
                  <input required type="number" name="price" value={formData.price || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Ancien Prix</label>
                  <input type="number" name="oldPrice" value={formData.oldPrice || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                </div>

                {/* Stock */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">{t.currentStock[language]}</label>
                  <input required type="number" name="stock" value={formData.stock || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">{t.alertLimit[language]}</label>
                  <input required type="number" name="stockAlert" value={formData.stockAlert || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                </div>

                 <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">{t.features[language]}</label>
                  <div className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      value={featureInput} 
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="..."
                      className="flex-grow rounded-md border-gray-300 shadow-sm p-2 border"
                    />
                    <button type="button" onClick={handleAddFeature} className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300">{t.addToCart[language]}</button>
                  </div>
                  <ul className="space-y-1">
                    {formData.features?.map((f, i) => (
                      <li key={i} className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded text-sm text-gray-700">
                        <span>{f}</span>
                        <button type="button" onClick={() => handleRemoveFeature(i)} className="text-red-500 hover:text-red-700">
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Logistique */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">{t.packaging[language]}</label>
                  <input type="text" name="packaging" value={formData.packaging || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">{t.warranty[language]}</label>
                  <input type="text" name="warranty" value={formData.warranty || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                </div>

              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200 gap-2">
              <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-mru-green text-base font-medium text-white hover:bg-[#144a14] focus:outline-none sm:ml-3 sm:w-auto sm:text-sm items-center gap-2">
                <Save size={18} />
                {t.save[language]}
              </button>
              <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                {t.cancel[language]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;