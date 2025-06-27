'use client';

import { useState } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { ProductFilters } from './product-filters';
import { ProductCard } from './product-card';
import { FeaturedProductHero } from './featured-product-hero';
import { Product, Category } from './types';

// Datos de productos (después los conectarás con tu base de datos)
const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Nike Air Force 1 '07",
    brand: "Nike",
    price: 89990,
    originalPrice: 119990,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop",
    category: "Zapatillas",
    rating: 4.8,
    reviews: 324,
    isNew: true,
    discount: 25,
    isFeatured: true,
    description: "El clásico que nunca pasa de moda. Comodidad y estilo en cada paso."
  },
  {
    id: 2,
    name: "Hoodie Oversized Urban",
    brand: "Adidas",
    price: 45990,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
    category: "Ropa",
    rating: 4.6,
    reviews: 156,
    isNew: false,
    discount: 0,
    isFeatured: false
  },
  {
    id: 3,
    name: "Jordan 1 Mid Chicago",
    brand: "Jordan",
    price: 134990,
    originalPrice: 149990,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    category: "Zapatillas",
    rating: 4.9,
    reviews: 892,
    isNew: false,
    discount: 10,
    isFeatured: false
  },
  {
    id: 4,
    name: "Jeans Skinny Fit",
    brand: "Levi's",
    price: 69990,
    originalPrice: 89990,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop",
    category: "Ropa",
    rating: 4.4,
    reviews: 203,
    isNew: false,
    discount: 22,
    isFeatured: false
  },
  {
    id: 5,
    name: "Polera Oversized Streetwear",
    brand: "Supreme",
    price: 39990,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    category: "Ropa",
    rating: 4.7,
    reviews: 445,
    isNew: true,
    discount: 0,
    isFeatured: false
  },
  {
    id: 6,
    name: "Adidas Stan Smith",
    brand: "Adidas",
    price: 79990,
    originalPrice: 99990,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop",
    category: "Zapatillas",
    rating: 4.5,
    reviews: 678,
    isNew: false,
    discount: 20,
    isFeatured: false
  }
];

const categories: Category[] = ["Todos", "Zapatillas", "Ropa", "Accesorios"];

export function FeaturedProducts() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Todos");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = selectedCategory === "Todos" 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === selectedCategory);

  const featuredProduct = filteredProducts.find(p => p.isFeatured) || filteredProducts[0];
  const otherProducts = filteredProducts.filter(p => p.id !== featuredProduct.id);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                <TrendingUp className="w-4 h-4" />
                <span>TRENDING NOW</span>
              </div>
              <div className="h-px bg-gradient-to-r from-purple-600 to-transparent flex-1"></div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight">
                Productos
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Destacados
                </span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                Los favoritos de nuestra comunidad. Calidad excepcional, estilo incomparable.
              </p>
            </div>
          </div>

          <ProductFilters 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Layout principal */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-16">
          
          <div className="lg:col-span-7">
            <FeaturedProductHero 
              product={featuredProduct}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-4 lg:gap-6 h-full">
              {otherProducts.slice(0, 4).map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA moderno equilibrado */}
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/3 to-transparent dark:from-blue-600/10 dark:via-purple-600/5 dark:to-transparent"></div>
            
            <div className="relative p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                
                {/* Contenido */}
                <div className="text-center lg:text-left space-y-4 lg:space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                      ¿Te gustó lo que viste?
                      <br />
                      <span className="text-blue-600 dark:text-blue-400">Hay mucho más</span>
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                      Explora toda nuestra colección y encuentra productos únicos que van contigo
                    </p>
                  </div>

                  {/* Beneficios rápidos */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full">✓ Envío gratis</span>
                    <span className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full">✓ 30 días garantía</span>
                    <span className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full">✓ Soporte 24/7</span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-3">
                    <span>Ver Todo el Catálogo</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="group bg-gray-200 dark:bg-white/10 dark:backdrop-blur-sm text-gray-700 dark:text-white border border-gray-300 dark:border-white/20 px-6 py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 dark:hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Ver Ofertas</span>
                    <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full group-hover:scale-125 transition-transform"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 