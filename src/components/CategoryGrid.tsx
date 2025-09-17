import { Badge } from "@/components/ui/badge";
import electronicsImg from "@/assets/category-electronics.jpg";
import fashionImg from "@/assets/category-fashion.jpg";
import homeImg from "@/assets/category-home.jpg";

const categories = [
  {
    id: 1,
    name: "Electrónicos",
    image: electronicsImg,
    discount: "Hasta 50% OFF",
    products: "15,240 productos"
  },
  {
    id: 2,
    name: "Moda",
    image: fashionImg,
    discount: "Hasta 40% OFF",
    products: "23,180 productos"
  },
  {
    id: 3,
    name: "Hogar y Jardín",
    image: homeImg,
    discount: "Hasta 35% OFF",
    products: "18,760 productos"
  },
  {
    id: 4,
    name: "Deportes",
    image: electronicsImg,
    discount: "Hasta 45% OFF",
    products: "12,350 productos"
  },
  {
    id: 5,
    name: "Automóviles",
    image: fashionImg,
    discount: "Hasta 30% OFF",
    products: "9,820 productos"
  },
  {
    id: 6,
    name: "Belleza",
    image: homeImg,
    discount: "Hasta 25% OFF",
    products: "14,200 productos"
  }
];

const CategoryGrid = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Categorías con descuentos especiales
          </h2>
          <p className="text-muted-foreground">
            Descubre los mejores precios en todas las categorías
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="group relative bg-card rounded-lg overflow-hidden shadow-marketplace hover:shadow-marketplace-hover transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Discount badge */}
                <Badge className="absolute top-3 right-3 bg-marketplace-orange text-white">
                  {category.discount}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.products}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;