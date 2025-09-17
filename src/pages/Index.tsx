import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCarousel from "@/components/ProductCarousel";
import SupplierCarousel from "@/components/SupplierCarousel";

// Sample product data
const bestSellingProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB - Titanio Natural",
    price: 32999,
    originalPrice: 36999,
    rating: 5,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    discount: "11% OFF",
    supplier: "TechStore MX"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: 28999,
    originalPrice: 31999,
    rating: 5,
    reviews: 890,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    discount: "9% OFF",
    supplier: "Samsung Official"
  },
  {
    id: 3,
    name: "MacBook Air M3 13\" 512GB",
    price: 45999,
    originalPrice: 49999,
    rating: 5,
    reviews: 670,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    discount: "8% OFF",
    supplier: "Apple Store"
  },
  {
    id: 4,
    name: "PlayStation 5 + 2 Controles",
    price: 15999,
    originalPrice: 17999,
    rating: 5,
    reviews: 2340,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
    discount: "11% OFF",
    supplier: "Gaming Zone"
  },
  {
    id: 5,
    name: "Apple Watch Series 9 GPS 45mm",
    price: 12999,
    originalPrice: 14999,
    rating: 4,
    reviews: 580,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop",
    discount: "13% OFF",
    supplier: "iStore México"
  },
  {
    id: 6,
    name: "Nike Air Max 270 - Edición Limitada",
    price: 3299,
    originalPrice: 3899,
    rating: 4,
    reviews: 1120,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    discount: "15% OFF",
    supplier: "Nike Store"
  }
];

const trendingProducts = [
  {
    id: 7,
    name: "Auriculares Sony WH-1000XM5",
    price: 7999,
    originalPrice: 8999,
    rating: 5,
    reviews: 1890,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    discount: "11% OFF",
    supplier: "Audio Pro"
  },
  {
    id: 8,
    name: "Tesla Model Y Llantas Deportivas",
    price: 45000,
    originalPrice: 52000,
    rating: 5,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=400&fit=crop",
    discount: "13% OFF",
    supplier: "Tesla Mexico"
  },
  {
    id: 9,
    name: "Sofá Modular 3 Piezas - Gris",
    price: 18999,
    originalPrice: 22999,
    rating: 4,
    reviews: 450,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    discount: "17% OFF",
    supplier: "Muebles del Hogar"
  },
  {
    id: 10,
    name: "Kit Herramientas Profesional 150 Pzs",
    price: 2899,
    originalPrice: 3299,
    rating: 5,
    reviews: 780,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
    discount: "12% OFF",
    supplier: "Herramientas Pro"
  },
  {
    id: 11,
    name: "Cafetera Espresso Delonghi",
    price: 8999,
    originalPrice: 10999,
    rating: 4,
    reviews: 920,
    image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=400&h=400&fit=crop",
    discount: "18% OFF",
    supplier: "Kitchen Store"
  },
  {
    id: 12,
    name: "Bicicleta Montaña Trek 29\"",
    price: 15999,
    originalPrice: 18999,
    rating: 5,
    reviews: 560,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    discount: "16% OFF",
    supplier: "Bike World"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <CategoryGrid />
      <ProductCarousel 
        title="Productos más vendidos"
        subtitle="Los favoritos de nuestros compradores"
        products={bestSellingProducts}
      />
      <SupplierCarousel />
      <ProductCarousel 
        title="Tendencias del momento"
        subtitle="Productos que están marcando tendencia"
        products={trendingProducts}
      />
    </div>
  );
};

export default Index;
