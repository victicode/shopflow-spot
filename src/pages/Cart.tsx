import { useState } from "react";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  supplier: string;
  discount: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Smartphone Android 128GB",
      image: "/placeholder.svg",
      price: 299,
      originalPrice: 399,
      quantity: 1,
      supplier: "TechGlobal Ltd.",
      discount: 25
    },
    {
      id: "2", 
      name: "Auriculares Bluetooth Pro",
      image: "/placeholder.svg",
      price: 89,
      originalPrice: 129,
      quantity: 2,
      supplier: "AudioMax Inc.",
      discount: 31
    },
    {
      id: "3",
      name: "Cargador Inalámbrico Rápido",
      image: "/placeholder.svg", 
      price: 45,
      originalPrice: 65,
      quantity: 1,
      supplier: "PowerTech Co.",
      discount: 30
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

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
            <ShoppingCart className="w-8 h-8 text-primary" />
            Mi Carrito ({cartItems.length})
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
              <p className="text-muted-foreground mb-6">Explora nuestros productos y encuentra lo que buscas</p>
              <Button onClick={() => navigate("/")}>
                Seguir Comprando
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 text-xs"
                      >
                        -{item.discount}%
                      </Badge>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">Por {item.supplier}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-bold text-primary">${item.price}</span>
                        <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 h-8 text-center"
                            min="1"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} productos)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-green-600">
                      <span>Ahorros</span>
                      <span>-${totalSavings.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "GRATIS" : `$${shipping}`}
                      </span>
                    </div>
                    
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Envío gratis en compras mayores a $100
                      </p>
                    )}
                  </div>

                  <Separator className="my-4" />
                  
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full h-12 text-base font-semibold">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceder al Pago
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate("/")}
                    >
                      Seguir Comprando
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Compra 100% segura</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Garantía de devolución</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;