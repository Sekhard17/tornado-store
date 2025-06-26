'use client';

import { useState } from 'react';
import { Heart, ShoppingBag, Star, Eye, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Productos de ejemplo (después los conectarás con tu base de datos)
const featuredProducts = [
  {
    id: 1,
    name: "Nike Air Force 1 '07",
    brand: "Nike",
    price: 89990,
    originalPrice: 119990,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    category: "Zapatillas",
    rating: 4.8,
    reviews: 324,
    isNew: true,
    discount: 25
  },
  {
    id: 2,
    name: "Hoodie Oversized Urban",
    brand: "Adidas",
    price: 45990,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    category: "Ropa",
    rating: 4.6,
    reviews: 156,
    isNew: false,
    discount: 0
  },
  {
    id: 3,
    name: "Jordan 1 Mid Chicago",
    brand: "Jordan",
    price: 134990,
    originalPrice: 149990,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Zapatillas",
    rating: 4.9,
    reviews: 892,
    isNew: false,
    discount: 10
  },
  {
    id: 4,
    name: "Jeans Skinny Fit",
    brand: "Levi's",
    price: 69990,
    originalPrice: 89990,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    category: "Ropa",
    rating: 4.4,
    reviews: 203,
    isNew: false,
    discount: 22
  },
  {
    id: 5,
    name: "Polera Oversized Streetwear",
    brand: "Supreme",
    price: 39990,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Ropa",
    rating: 4.7,
    reviews: 445,
    isNew: true,
    discount: 0
  },
  {
    id: 6,
    name: "Adidas Stan Smith",
    brand: "Adidas",
    price: 79990,
    originalPrice: 99990,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop",
    category: "Zapatillas",
    rating: 4.5,
    reviews: 678,
    isNew: false,
    discount: 20
  }
];

const categories = ["Todos", "Zapatillas", "Ropa", "Accesorios"];

export function FeaturedProducts() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = selectedCategory === "Todos" 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === selectedCategory);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4" />
            <span>PRODUCTOS DESTACADOS</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4">
            Lo más <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Popular</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubre los productos más vendidos y mejor valorados por nuestra comunidad
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Imagen del producto */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      NUEVO
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 ${
                      favorites.includes(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  
                  <button className="p-3 bg-white/90 backdrop-blur-md rounded-full text-gray-700 hover:bg-purple-500 hover:text-white transition-all duration-300 border border-white/20">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Overlay de compra rápida */}
                <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-transform duration-300 shadow-lg flex items-center justify-center space-x-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Agregar al Carrito</span>
                  </button>
                </div>
              </div>

              {/* Información del producto */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    {product.brand}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-black text-gray-900 dark:text-white">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Ver Todos */}
        <div className="text-center">
          <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 mx-auto">
            <span>Ver Todos los Productos</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
} 