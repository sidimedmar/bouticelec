import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    titleFr: "Samsung Galaxy Smartphone",
    titleAr: "هاتف ذكي سامسونج جالاكسي",
    subtitleFr: "Smartphone haute performance",
    subtitleAr: "هاتف ذكي عالي الأداء",
    sellingPointFr: "Le meilleur rapport qualité/prix de l'année pour les amateurs de photo.",
    sellingPointAr: "أفضل قيمة مقابل السعر هذا العام لعشاق التصوير.",
    price: 13500,
    oldPrice: 15000,
    image: "https://images.unsplash.com/photo-1610945265078-385f72642866?auto=format&fit=crop&q=80&w=800",
    category: "High-Tech",
    isNew: true,
    features: [
      "Écran Super AMOLED 6.5 pouces",
      "Batterie 5000mAh longue durée",
      "128GB Stockage / 6GB RAM",
      "Triple caméra IA 64MP"
    ],
    stock: 12,
    stockAlert: 5,
    packaging: "Boîte renforcée scellée",
    warranty: "12 mois"
  },
  {
    id: 2,
    titleFr: "Chaussures Sport Nike",
    titleAr: "حذاء رياضي نايكي",
    subtitleFr: "Confortable et moderne",
    subtitleAr: "مريح وعصري",
    sellingPointFr: "Alliez style urbain et performance sportive sans compromis.",
    sellingPointAr: "اجمع بين الأسلوب الحضري والأداء الرياضي دون مساومة.",
    price: 6800,
    oldPrice: 8000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    category: "Mode",
    isNew: true,
    features: [
      "Semelle Air Max amortissante",
      "Tissu respirant Mesh",
      "Design ergonomique léger",
      "Disponible en 3 coloris"
    ],
    stock: 4,
    stockAlert: 8,
    packaging: "Boîte standard",
    sizeGuide: "EU 38-45"
  },
  {
    id: 3,
    titleFr: "Apple Watch Series",
    titleAr: "ساعة آبل الذكية",
    subtitleFr: "Dernière technologie portable",
    subtitleAr: "أحدث التقنيات القابلة للارتداء",
    sellingPointFr: "L'extension parfaite de votre iPhone pour une vie connectée.",
    sellingPointAr: "الامتداد المثالي للآيفون لحياة متصلة.",
    price: 25000,
    image: "https://images.unsplash.com/photo-1434493789847-2f02ea6ca920?auto=format&fit=crop&q=80&w=800",
    category: "High-Tech",
    isNew: false,
    features: [
      "Capteur cardiaque ECG",
      "GPS intégré",
      "Écran Retina toujours activé",
      "Résistant à l'eau 50m"
    ],
    stock: 25,
    stockAlert: 5,
    packaging: "Boîte Premium Apple",
    warranty: "Apple Care"
  }
];