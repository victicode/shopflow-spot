import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className="text-white space-y-6 animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Encuentra todo lo que
              <span className="block text-yellow-300">necesitas aquí</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90">
              Miles de productos de proveedores confiables al mejor precio
            </p>
            
            {/* Search bar */}
            <div className="bg-white rounded-lg p-2 flex items-center shadow-marketplace-hover max-w-md">
              <Input 
                placeholder="Buscar productos..." 
                className="border-0 focus:ring-0 text-foreground placeholder:text-muted-foreground"
              />
              <Button className="bg-marketplace-orange hover:bg-marketplace-orange/90 ml-2">
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Ver ofertas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Productos populares
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="relative animate-scale-in">
            <img 
              src={heroBanner} 
              alt="Productos del marketplace" 
              className="rounded-lg shadow-marketplace-hover w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;