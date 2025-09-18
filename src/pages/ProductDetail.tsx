import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, CreditCard, Truck, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ProductCarousel from "@/components/ProductCarousel";
import SalesChart from "@/components/SalesChart";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: 1,
    name: "Smartphone Android 5G 128GB 6.5\" - Cámara Triple 64MP",
    price: 299,
    originalPrice: 399,
    discount: "25% OFF",
    rating: 4.7,
    reviews: 2847,
    sold: 15420,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop"
    ],
    supplier: {
      name: "TechnoMax Solutions",
      rating: 4.8,
      responseRate: "98%",
      responseTime: "< 2 horas",
      verified: true
    },
    pricing: {
      retail: 299,
      wholesale: {
        "2-9 unidades": 289,
        "10-49 unidades": 279,
        "50+ unidades": 269
      }
    },
    specifications: [
      "Pantalla: 6.5\" AMOLED 120Hz",
      "Procesador: Snapdragon 778G",
      "RAM: 8GB",
      "Almacenamiento: 128GB",
      "Cámara: 64MP + 12MP + 5MP",
      "Batería: 4500mAh"
    ]
  };

  const similarProducts = [
    {
      id: 2,
      name: "Smartphone Pro Max 256GB",
      price: 449,
      originalPrice: 599,
      rating: 4.8,
      reviews: 1203,
      image: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=300&h=300&fit=crop",
      discount: "25% OFF",
      supplier: "MobileTech Pro"
    },
    {
      id: 3,
      name: "Tablet Android 10.1\" 64GB",
      price: 189,
      originalPrice: 249,
      rating: 4.5,
      reviews: 856,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
      discount: "24% OFF",
      supplier: "TabletZone"
    },
    {
      id: 4,
      name: "Auriculares Bluetooth Pro",
      price: 79,
      originalPrice: 99,
      rating: 4.6,
      reviews: 2104,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      discount: "20% OFF",
      supplier: "AudioTech"
    },
    {
      id: 5,
      name: "Smartwatch Deportivo GPS",
      price: 159,
      originalPrice: 199,
      rating: 4.4,
      reviews: 1456,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      discount: "20% OFF",
      supplier: "WearTech"
    }
  ];

  const reviews = [
    {
      id: 1,
      author: "María G.",
      rating: 5,
      comment: "Excelente producto, muy buena calidad y entrega rápida.",
      date: "2024-01-15",
      verified: true
    },
    {
      id: 2,
      author: "Carlos R.",
      rating: 4,
      comment: "Buen teléfono por el precio, la cámara es muy buena.",
      date: "2024-01-10",
      verified: true
    },
    {
      id: 3,
      author: "Ana L.",
      rating: 5,
      comment: "Superó mis expectativas, muy recomendado.",
      date: "2024-01-08",
      verified: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground">
              Inicio / Electrónicos / Smartphones / {product.name}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.discount && (
                <Badge className="absolute top-4 left-4 bg-marketplace-orange text-white text-lg px-3 py-1">
                  {product.discount}
                </Badge>
              )}
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-marketplace-orange' : 'border-border'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
              
              {/* Rating and Sales */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviews.toLocaleString()} reseñas)
                </span>
                <span className="text-muted-foreground">
                  {product.sold.toLocaleString()} vendidos
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-marketplace-orange">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Wholesale Pricing */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Precios Mayoristas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(product.pricing.wholesale).map(([range, price]) => (
                      <div key={range} className="flex justify-between">
                        <span className="text-muted-foreground">{range}</span>
                        <span className="font-semibold">${price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium">Cantidad:</label>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button className="bg-marketplace-orange hover:bg-marketplace-orange/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Agregar al Carrito
                  </Button>
                  <Button variant="outline">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Comprar Ahora
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Guardar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              </div>

              {/* Supplier Info */}
              <Card className="mt-5">
                <CardContent className="p-4 ">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Vendido por: {product.supplier.name}</h3>
                    {product.supplier.verified && (
                      <Badge className="bg-marketplace-success text-white">
                        <Shield className="h-3 w-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span>{product.supplier.rating}</span>
                      </div>
                      <span className="text-muted-foreground">Calificación</span>
                    </div>
                    <div>
                      <div>{product.supplier.responseRate}</div>
                      <span className="text-muted-foreground">Tasa de respuesta</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas ({product.reviews})</TabsTrigger>
              <TabsTrigger value="sales">Estadísticas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-marketplace-orange rounded-full"></div>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.author}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Compra verificada
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sales" className="mt-6">
              <SalesChart />
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Products */}
        <ProductCarousel
          title="Productos Similares"
          subtitle="Otros productos que te podrían interesar"
          products={similarProducts}
        />
      </div>
    </div>
  );
};

export default ProductDetail;