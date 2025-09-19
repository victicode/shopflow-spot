import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Filter, Grid, List, Star, MapPin, Package, DollarSign, Tag, User, Calendar, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  supplier: string;
  location: string;
  brand: string;
  condition: "nuevo" | "usado";
  category: string;
  inStock: boolean;
  createdAt: string;
}

interface Filters {
  priceRange: [number, number];
  brands: string[];
  suppliers: string[];
  locations: string[];
  conditions: string[];
  categories: string[];
  inStockOnly: boolean;
  minRating: number;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 14 Pro Max 256GB",
    image: "/placeholder.svg",
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    reviews: 1247,
    supplier: "TechGlobal Ltd.",
    location: "Madrid",
    brand: "Apple",
    condition: "nuevo",
    category: "Electrónicos",
    inStock: true,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Samsung Galaxy S23 Ultra",
    image: "/placeholder.svg",
    price: 749,
    originalPrice: 999,
    rating: 4.7,
    reviews: 856,
    supplier: "ElectroMax",
    location: "Barcelona",
    brand: "Samsung",
    condition: "usado",
    category: "Electrónicos",
    inStock: true,
    createdAt: "2024-02-10"
  },
  {
    id: "3",
    name: "MacBook Pro M2 14''",
    image: "/placeholder.svg",
    price: 1599,
    originalPrice: 1899,
    rating: 4.9,
    reviews: 432,
    supplier: "ComputerWorld",
    location: "Valencia",
    brand: "Apple",
    condition: "nuevo",
    category: "Computadoras",
    inStock: false,
    createdAt: "2024-01-20"
  },
  {
    id: "4",
    name: "Nike Air Max 270",
    image: "/placeholder.svg",
    price: 89,
    originalPrice: 129,
    rating: 4.6,
    reviews: 723,
    supplier: "SportStyle",
    location: "Sevilla",
    brand: "Nike",
    condition: "nuevo",
    category: "Ropa y Calzado",
    inStock: true,
    createdAt: "2024-03-05"
  },
  {
    id: "5",
    name: "Dyson V15 Detect",
    image: "/placeholder.svg",
    price: 399,
    originalPrice: 549,
    rating: 4.8,
    reviews: 234,
    supplier: "HomeClean",
    location: "Bilbao",
    brand: "Dyson",
    condition: "usado",
    category: "Hogar",
    inStock: true,
    createdAt: "2024-02-28"
  },
  {
    id: "6",
    name: "Sony WH-1000XM5",
    image: "/placeholder.svg",
    price: 249,
    originalPrice: 349,
    rating: 4.9,
    reviews: 1156,
    supplier: "AudioPro",
    location: "Madrid",
    brand: "Sony",
    condition: "nuevo",
    category: "Electrónicos",
    inStock: true,
    createdAt: "2024-01-30"
  }
];

const SearchSidebar = ({ filters, onFiltersChange }: { filters: Filters; onFiltersChange: (filters: Filters) => void }) => {
  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'brands' | 'suppliers' | 'locations' | 'conditions' | 'categories', value: string) => {
    const current = filters[key];
    const updated = current.includes(value) 
      ? current.filter(item => item !== value)
      : [...current, value];
    handleFilterChange(key, updated);
  };

  return (
    <div className="w-80 min-h-screen bg-card border-r p-6 space-y-6">
      <div className="sticky top-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          Filtros
        </h2>

        {/* Precio */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium">Rango de Precio</h3>
          </div>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange('priceRange', value as [number, number])}
              max={2000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>€{filters.priceRange[0]}</span>
              <span>€{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Marcas */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium">Marcas</h3>
          </div>
          <div className="space-y-3">
            {['Apple', 'Samsung', 'Nike', 'Dyson', 'Sony'].map((brand) => (
              <div key={brand} className="flex items-center space-x-3">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() => toggleArrayFilter('brands', brand)}
                />
                <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer hover:text-primary transition-colors">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Condición */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium">Condición</h3>
          </div>
          <div className="space-y-3">
            {['nuevo', 'usado'].map((condition) => (
              <div key={condition} className="flex items-center space-x-3">
                <Checkbox
                  id={`condition-${condition}`}
                  checked={filters.conditions.includes(condition)}
                  onCheckedChange={() => toggleArrayFilter('conditions', condition)}
                />
                <label htmlFor={`condition-${condition}`} className="text-sm cursor-pointer hover:text-primary transition-colors capitalize">
                  {condition}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Ubicación */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium">Ubicación</h3>
          </div>
          <div className="space-y-3">
            {['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'].map((location) => (
              <div key={location} className="flex items-center space-x-3">
                <Checkbox
                  id={`location-${location}`}
                  checked={filters.locations.includes(location)}
                  onCheckedChange={() => toggleArrayFilter('locations', location)}
                />
                <label htmlFor={`location-${location}`} className="text-sm cursor-pointer hover:text-primary transition-colors">
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Categorías */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Grid className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium">Categorías</h3>
          </div>
          <div className="space-y-3">
            {['Electrónicos', 'Computadoras', 'Ropa y Calzado', 'Hogar'].map((category) => (
              <div key={category} className="flex items-center space-x-3">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => toggleArrayFilter('categories', category)}
                />
                <label htmlFor={`category-${category}`} className="text-sm cursor-pointer hover:text-primary transition-colors">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Calificación Mínima */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium">Calificación Mínima</h3>
          </div>
          <Select
            value={filters.minRating.toString()}
            onValueChange={(value) => handleFilterChange('minRating', parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Cualquiera</SelectItem>
              <SelectItem value="3">3+ estrellas</SelectItem>
              <SelectItem value="4">4+ estrellas</SelectItem>
              <SelectItem value="4.5">4.5+ estrellas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-6" />

        {/* Solo en Stock */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="inStock"
              checked={filters.inStockOnly}
              onCheckedChange={(checked) => handleFilterChange('inStockOnly', checked)}
            />
            <label htmlFor="inStock" className="text-sm cursor-pointer hover:text-primary transition-colors">
              Solo productos en stock
            </label>
          </div>
        </div>

        {/* Limpiar Filtros */}
        <Button
          variant="outline"
          onClick={() => onFiltersChange({
            priceRange: [0, 2000],
            brands: [],
            suppliers: [],
            locations: [],
            conditions: [],
            categories: [],
            inStockOnly: false,
            minRating: 0
          })}
          className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Limpiar Filtros
        </Button>
      </div>
    </div>
  );
};

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 2000],
    brands: [],
    suppliers: [],
    locations: [],
    conditions: [],
    categories: [],
    inStockOnly: false,
    minRating: 0
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
  }, [searchParams]);

  useEffect(() => {
    let filtered = mockProducts;

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Aplicar filtros
    filtered = filtered.filter(product => {
      return (
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1] &&
        (filters.brands.length === 0 || filters.brands.includes(product.brand)) &&
        (filters.suppliers.length === 0 || filters.suppliers.includes(product.supplier)) &&
        (filters.locations.length === 0 || filters.locations.includes(product.location)) &&
        (filters.conditions.length === 0 || filters.conditions.includes(product.condition)) &&
        (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
        (!filters.inStockOnly || product.inStock) &&
        product.rating >= filters.minRating
      );
    });

    // Ordenar
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, filters, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <SearchSidebar filters={filters} onFiltersChange={setFilters} />
        
        <main className="flex-1 p-6 bg-muted/20">
          {/* Búsqueda y Controles */}
          <div className="mb-6 space-y-4">
            <Card className="p-4">
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" className="px-6">
                  Buscar
                </Button>
              </form>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {filteredProducts.length} productos encontrados
                  </span>
                  {searchQuery && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      "{searchQuery}"
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Más relevante</SelectItem>
                      <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                      <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                      <SelectItem value="rating">Mejor calificación</SelectItem>
                      <SelectItem value="newest">Más recientes</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-none"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Resultados */}
          {filteredProducts.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No se encontraron productos</h2>
                <p className="text-muted-foreground mb-6">
                  Intenta ajustar tus filtros o términos de búsqueda
                </p>
                <Button onClick={() => setFilters({
                  priceRange: [0, 2000],
                  brands: [],
                  suppliers: [],
                  locations: [],
                  conditions: [],
                  categories: [],
                  inStockOnly: false,
                  minRating: 0
                })}>
                  Limpiar Filtros
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={
              viewMode === "grid" 
                ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={`group hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 ${
                    viewMode === "list" ? "flex overflow-hidden" : "overflow-hidden"
                  }`}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className={`relative ${viewMode === "list" ? "w-48 shrink-0" : ""}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                        viewMode === "list" ? "w-full h-32" : "w-full h-48"
                      }`}
                    />
                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 space-y-1">
                      <Badge variant="destructive" className="shadow-md">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </Badge>
                    </div>
                    
                    <Badge 
                      variant={product.inStock ? "default" : "secondary"}
                      className="absolute top-2 right-2 shadow-md"
                    >
                      {product.inStock ? "En Stock" : "Agotado"}
                    </Badge>
                  </div>
                  
                  <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className={viewMode === "list" ? "flex justify-between h-full" : ""}>
                      <div className={viewMode === "list" ? "flex-1 pr-4" : ""}>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center gap-1 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating) 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          <Badge variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                            {product.brand}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {product.condition}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {product.location}
                          </Badge>
                        </div>

                        <p className="text-xs text-muted-foreground mb-3">{product.supplier}</p>
                      </div>

                      <div className={`${viewMode === "list" ? "text-right flex flex-col justify-between" : ""}`}>
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-bold text-primary">€{product.price}</span>
                            <span className="text-sm text-muted-foreground line-through">€{product.originalPrice}</span>
                          </div>
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="w-full hover:scale-105 transition-transform"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="w-3 h-3 mr-2" />
                          {product.inStock ? "Agregar" : "Agotado"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;