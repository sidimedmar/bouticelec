import React from 'react';
import { Truck, ShieldCheck, BadgeDollarSign } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Pourquoi nous?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Feature 1 */}
          <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-md transition">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100 text-orange-600">
              <Truck size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Livraison rapide</h3>
            <p className="text-gray-600">
              Nous vous livrons le plus rapidement possible
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-md transition">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-red-100 text-mru-red">
              <span className="text-2xl font-black italic transform -rotate-6">100</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Qualité garantie</h3>
            <p className="text-gray-600">
              Produits 100% authentiques
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-md transition">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-yellow-100 text-yellow-600">
              <BadgeDollarSign size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Prix compétitifs</h3>
            <p className="text-gray-600">
              Les meilleurs prix du marché
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;