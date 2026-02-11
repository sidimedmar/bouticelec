import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import AdminView from './components/AdminView';
import Features from './components/Features';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminSettingsModal from './components/AdminSettingsModal';
import { products as initialProducts } from './data';
import { Product, CartItem, Language, SiteContent } from './types';
import { t } from './translations';

function App() {
  // Load products from LocalStorage or use defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<'shop' | 'admin'>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [language, setLanguage] = useState<Language>('fr');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Auth & Settings State with Persistence
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem('adminPin') || "1313";
  });
  
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    return localStorage.getItem('whatsappNumber') || "22200000000";
  });

  // Default Content
  const defaultSiteContent: SiteContent = {
    storeName: "E-Commerce Mauritanie",
    heroTitle: {
      fr: t.welcome.fr,
      ar: t.welcome.ar
    },
    heroSubtitle: {
      fr: t.heroSubtitle.fr,
      ar: t.heroSubtitle.ar
    },
    footerText: {
      fr: "© 2024 E-Commerce Mauritanie - Tous droits réservés",
      ar: "© 2024 التجارة الإلكترونية الموريتانية - جميع الحقوق محفوظة"
    }
  };

  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('siteContent');
    return saved ? JSON.parse(saved) : defaultSiteContent;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Update document direction on language change
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.title = siteContent.storeName;
  }, [language, siteContent.storeName]);

  // PERSISTENCE EFFECTS
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('adminPin', adminPin);
  }, [adminPin]);

  useEffect(() => {
    localStorage.setItem('whatsappNumber', whatsappNumber);
  }, [whatsappNumber]);

  useEffect(() => {
    localStorage.setItem('siteContent', JSON.stringify(siteContent));
  }, [siteContent]);

  // --- AUTH LOGIC ---
  const handleAdminClick = () => {
    if (isAuthenticated) {
      setCurrentView('admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogin = (enteredPin: string) => {
    if (enteredPin === adminPin) {
      setIsAuthenticated(true);
      setIsLoginModalOpen(false);
      setCurrentView('admin');
      return true;
    }
    return false;
  };

  const handleSaveSettings = (newPin: string, newWhatsapp: string, newContent: SiteContent) => {
    setAdminPin(newPin);
    setWhatsappNumber(newWhatsapp);
    setSiteContent(newContent);
    showNotification(t.settingsSaved[language]);
  };

  // --- CRUD OPERATIONS ---

  // Create
  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
    showNotification("Produit ajouté avec succès !");
  };

  // Update
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    showNotification("Produit mis à jour avec succès !");
  };

  // Delete
  const handleDeleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showNotification("Produit supprimé.");
  };

  // --- CART & UI ---

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotification(`${language === 'fr' ? product.titleFr : product.titleAr} ${language === 'fr' ? 'ajouté!' : 'تمت الإضافة!'}`);
  };

  const handleUpdateCartQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 ${language === 'fr' ? 'right-4' : 'left-4'} bg-white border-${language === 'fr' ? 'l' : 'r'}-4 border-mru-green text-gray-800 px-6 py-3 rounded shadow-lg z-[100] font-medium flex items-center`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleToggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'ar' : 'fr');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        currentView={currentView}
        language={language}
        onNavigate={setCurrentView}
        onToggleLanguage={handleToggleLanguage}
        onOpenCart={() => setIsCartOpen(true)}
        isAuthenticated={isAuthenticated}
        onAdminClick={handleAdminClick}
        storeName={siteContent.storeName}
      />
      
      {currentView === 'shop' ? (
        <>
          <Hero 
            language={language} 
            title={language === 'fr' ? siteContent.heroTitle.fr : siteContent.heroTitle.ar}
            subtitle={language === 'fr' ? siteContent.heroSubtitle.fr : siteContent.heroSubtitle.ar}
          />
          
          <main className="flex-grow">
            <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">{t.featured[language]}</h2>
                <div className="h-1 w-20 bg-mru-yellow mx-auto mt-4 rounded"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    language={language}
                    onAddToCart={handleAddToCart} 
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>

            <Features />
          </main>
        </>
      ) : (
        <main className="flex-grow">
          <AdminView 
            products={products} 
            language={language}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        </main>
      )}

      <Footer 
        text={language === 'fr' ? siteContent.footerText.fr : siteContent.footerText.ar}
        whatsapp={whatsappNumber}
      />

      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          language={language}
          isOpen={!!selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={handleAddToCart}
        />
      )}

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        language={language}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        whatsappNumber={whatsappNumber}
      />

      <AdminLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        language={language}
      />

      <AdminSettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        language={language}
        currentPin={adminPin}
        currentWhatsapp={whatsappNumber}
        currentSiteContent={siteContent}
        onSave={handleSaveSettings}
      />
    </div>
  );
}

export default App;