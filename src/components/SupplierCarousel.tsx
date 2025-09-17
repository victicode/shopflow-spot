import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface Supplier {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  products: number;
  location: string;
  logo: string;
  verified: boolean;
  yearsActive: number;
  categories: string[];
}

const suppliers: Supplier[] = [
  {
    id: 1,
    name: "TechnoMax Solutions",
    rating: 4.8,
    reviews: 2340,
    products: 850,
    location: "Ciudad de México",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
    verified: true,
    yearsActive: 8,
    categories: ["Electrónicos", "Computadoras"]
  },
  {
    id: 2,
    name: "Fashion Forward Co.",
    rating: 4.7,
    reviews: 1890,
    products: 1200,
    location: "Guadalajara",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=center",
    verified: true,
    yearsActive: 5,
    categories: ["Moda", "Accesorios"]
  },
  {
    id: 3,
    name: "HomeStyle Depot",
    rating: 4.9,
    reviews: 3120,
    products: 670,
    location: "Monterrey",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop&crop=center",
    verified: true,
    yearsActive: 12,
    categories: ["Hogar", "Muebles"]
  },
  {
    id: 4,
    name: "SportZone Pro",
    rating: 4.6,
    reviews: 980,
    products: 420,
    location: "Puebla",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop&crop=center",
    verified: true,
    yearsActive: 6,
    categories: ["Deportes", "Fitness"]
  },
  {
    id: 5,
    name: "AutoParts Express",
    rating: 4.5,
    reviews: 1560,
    products: 890,
    location: "Tijuana",
    logo: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop&crop=center",
    verified: true,
    yearsActive: 9,
    categories: ["Automóviles", "Repuestos"]
  }
];

const SupplierCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= suppliers.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, suppliers.length - itemsPerView) : Math.max(0, prev - itemsPerView)
    );
  };

  const visibleSuppliers = suppliers.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-12 bg-marketplace-gray-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Mejores Proveedores
            </h2>
            <p className="text-muted-foreground">
              Proveedores confiables con años de experiencia
            </p>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={nextSlide}
              disabled={currentIndex + itemsPerView >= suppliers.length}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Suppliers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleSuppliers.map((supplier) => (
            <Card key={supplier.id} className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-0 bg-card/50">
              <CardContent className="p-4">
                {/* Simplified header */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <img 
                      src={supplier.logo} 
                      alt={supplier.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {supplier.verified && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-marketplace-success rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm truncate">
                      {supplier.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span>{supplier.rating}</span>
                      <span>•</span>
                      <span>{supplier.products}+</span>
                    </div>
                  </div>
                </div>

                {/* Minimal stats */}
                <div className="flex justify-between text-center">
                  <div>
                    <p className="text-sm font-semibold text-marketplace-orange">
                      {supplier.yearsActive}
                    </p>
                    <p className="text-xs text-muted-foreground">Años</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-marketplace-blue">
                      {supplier.reviews}
                    </p>
                    <p className="text-xs text-muted-foreground">Reviews</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {supplier.categories.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Categorías</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupplierCarousel;