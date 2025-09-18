import { useState } from "react";
import { Heart, Star, ShoppingCart, Eye, Store, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

interface FavoriteProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  supplier: string;
  supplierVerified: boolean;
  discount: number;
  inStock: boolean;
}

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([
    {
      id: "1",
      name: "Smartphone Android 128GB Ultra Pro",
      image: "/placeholder.svg",
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 1247,
      supplier: "TechGlobal Ltd.",
      supplierVerified: true,
      discount: 25,
      inStock: true
    },
    {
      id: "2",
      name: "Auriculares Bluetooth Pro Max",
      image: "/placeholder.svg",
      price: 89,
      originalPrice: 129,
      rating: 4.6,
      reviews: 856,
      supplier: "AudioMax Inc.",
      supplierVerified: true,
      discount: 31,
      inStock: true
    },
    {
      id: "3",
      name: "Laptop Gaming RGB 16GB RAM",
      image: "/placeholder.svg",
      price: 899,
      originalPrice: 1299,
      rating: 4.9,
      reviews: 432,
      supplier: "GameTech Pro",
      supplierVerified: false,
      discount: 30,
      inStock: false
    },
    {
      id: "4",
      name: "Smartwatch Deportivo GPS",
      image: "/placeholder.svg",
      price: 159,
      originalPrice: 229,
      rating: 4.7,
      reviews: 723,
      supplier: "WearTech Solutions",
      supplierVerified: true,
      discount: 30,
      inStock: true
    }
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            Mis Favoritos ({favorites.length})
          </h1>
        </div>

        {favorites.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No tienes productos favoritos</h2>
              <p className="text-muted-foreground mb-6">Explora nuestros productos y guarda los que más te gusten</p>
              <Button onClick={() => navigate("/")}>
                Explorar Productos
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Discount Badge */}
                  <Badge 
                    variant="destructive" 
                    className="absolute top-2 left-2"
                  >
                    -{product.discount}%
                  </Badge>

                  {/* Stock Status */}
                  <Badge 
                    variant={product.inStock ? "default" : "secondary"}
                    className="absolute top-2 right-2"
                  >
                    {product.inStock ? "En Stock" : "Agotado"}
                  </Badge>

                  {/* Remove from Favorites */}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-12 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFavorite(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[40px]">
                    {product.name}
                  </h3>
                  
                  {/* Supplier Info */}
                  <div className="flex items-center gap-1 mb-2">
                    <Store className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{product.supplier}</span>
                    {product.supplierVerified && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        ✓
                      </Badge>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={!product.inStock}
                      className="flex-1"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {product.inStock ? "Agregar" : "Agotado"}
                    </Button>
                  </div>
                  
                  {/* Supplier Link */}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full mt-2 text-xs"
                    onClick={() => navigate(`/supplier/${product.supplier.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    Ver Proveedor
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Section */}
        {favorites.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Resumen de Favoritos</h2>
                <Badge variant="outline">{favorites.length} productos</Badge>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    ${favorites.reduce((sum, item) => sum + (item.originalPrice - item.price), 0).toFixed(0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Ahorros Potenciales</p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {favorites.filter(item => item.inStock).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Disponibles</p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">
                    {(favorites.reduce((sum, item) => sum + item.rating, 0) / favorites.length).toFixed(1)}⭐
                  </div>
                  <p className="text-sm text-muted-foreground">Calificación Promedio</p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    const availableItems = favorites.filter(item => item.inStock);
                    if (availableItems.length > 0) {
                      navigate("/cart");
                    }
                  }}
                >
                  Agregar Disponibles al Carrito ({favorites.filter(item => item.inStock).length})
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  Seguir Explorando
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Favorites;