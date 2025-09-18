import { Search, ShoppingCart, User, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="bg-card border-b shadow-marketplace">
      {/* Top bar */}
      <div className="bg-marketplace-blue text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>Bienvenido a MarketPlace</span>
            <span>•</span>
            <span>Vende en MarketPlace</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Ayuda</span>
            <span>•</span>
            <span>Español</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-marketplace-orange mr-8">
              MarketPlace
            </h1>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative flex">
              <Input 
                placeholder="Buscar productos, marcas y más..." 
                className="flex-1 rounded-r-none border-r-0 focus:ring-marketplace-orange focus:border-marketplace-orange"
              />
              <Button 
                className="rounded-l-none bg-marketplace-orange hover:bg-marketplace-orange/90 px-6"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <User className="h-5 w-5" />
              <span>Mi cuenta</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Heart className="h-5 w-5" />
              <span>Favoritos</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-1"
              onClick={() => window.location.href = '/cart'}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Carrito</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-marketplace-gray-light border-t">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-8 py-3">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Menu className="h-4 w-4" />
              <span>Categorías</span>
            </Button>
            <a href="#" className="text-sm hover:text-marketplace-orange transition-colors">Ofertas del día</a>
            <a href="#" className="text-sm hover:text-marketplace-orange transition-colors">Supermercado</a>
            <a href="#" className="text-sm hover:text-marketplace-orange transition-colors">Moda</a>
            <a href="#" className="text-sm hover:text-marketplace-orange transition-colors">Hogar y Muebles</a>
            <a href="#" className="text-sm hover:text-marketplace-orange transition-colors">Electrodomésticos</a>
            <a href="#" className="text-sm hover:text-marketplace-orange transition-colors">Herramientas</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;