import React, { useState } from 'react';
import { Product, Language } from '../types';
import { AlertTriangle, CheckCircle, Pencil, Trash2, Plus, Settings } from 'lucide-react';
import AddProductModal from './AddProductModal';
import { t } from '../translations';

interface AdminViewProps {
  products: Product[];
  language: Language;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
  onOpenSettings: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ 
  products, 
  language, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct,
  onOpenSettings
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = (product: Product) => {
    if (editingProduct) {
      onUpdateProduct(product);
    } else {
      onAddProduct(product);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`${language === 'fr' ? 'Supprimer' : 'حذف'} "${title}" ?`)) {
      onDeleteProduct(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.dashboard[language]}</h2>
          <p className="text-gray-500">{t.manageStock[language]}</p>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={onOpenSettings}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-50 transition flex items-center gap-2 shadow-sm"
          >
            <Settings size={20} />
            <span className="hidden sm:inline">{t.settings[language]}</span>
          </button>
          <button 
            onClick={handleOpenAdd}
            className="bg-mru-green text-white px-4 py-2 rounded-lg font-bold hover:bg-[#144a14] transition flex items-center gap-2 shadow-md"
          >
            <Plus size={20} />
            <span>{t.newProduct[language]}</span>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-start">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t.product[language]}</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t.category[language]}</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t.price[language]}</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t.stock[language]}</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t.status[language]}</th>
                <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">{t.actions[language]}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => {
                const isLowStock = product.stock <= product.stockAlert;
                const title = language === 'fr' ? product.titleFr : product.titleAr;
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt="" />
                        </div>
                        <div className="ml-4 mr-4">
                          <div className="text-sm font-medium text-gray-900">{title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="font-bold text-gray-900">{product.price} MRU</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.stock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isLowStock ? (
                        <span className="px-2 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          <AlertTriangle size={12} /> {t.lowStock[language]}
                        </span>
                      ) : (
                        <span className="px-2 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircle size={12} /> {t.inStock[language]}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button 
                        onClick={() => handleOpenEdit(product)}
                        className="text-indigo-600 hover:text-indigo-900 mx-2" 
                        title="Modifier"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id, product.titleFr)}
                        className="text-red-600 hover:text-red-900 mx-2"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        language={language}
        initialData={editingProduct}
      />
    </div>
  );
};

export default AdminView;