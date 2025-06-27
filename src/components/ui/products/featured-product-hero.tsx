'use client';

import { Heart, ShoppingBag, Star, Eye, Crown, Zap } from 'lucide-react';
import Image from 'next/image';
import { Product } from './types';

interface FeaturedProductHeroProps {
  product: Product;
  favorites: number[];
  onToggleFavorite: (productId: number) => void;
}

export function FeaturedProductHero({ 
  product, 
  favorites, 
  onToggleFavorite 
}: FeaturedProductHeroProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-4xl transition-all duration-700 hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50 h-full">
      
      {/* Badge especial para producto destacado */}
      <div className="absolute top-6 left-6 z-20">
        <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
          <Crown className="w-4 h-4" />
          <span>DESTACADO</span>
        </div>
      </div>

      {/* Imagen principal */}
      <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badges */}
        <div className="absolute top-6 right-6 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              NUEVO
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Botones de acción flotantes */}
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
          <button
            onClick={() => onToggleFavorite(product.id)}
            className={`p-4 rounded-2xl backdrop-blur-xl border border-white/20 transition-all duration-300 shadow-lg ${
              favorites.includes(product.id)
                ? 'bg-red-500 text-white scale-110'
                : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white hover:scale-110'
            }`}
          >
            <Heart className="w-5 h-5" />
          </button>
          
          <button className="p-4 bg-white/90 backdrop-blur-xl rounded-2xl text-gray-700 hover:bg-violet-500 hover:text-white transition-all duration-300 border border-white/20 shadow-lg hover:scale-110">
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Información detallada del producto principal */}
      <div className="p-8 lg:p-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
            {product.brand}
          </span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
              {product.rating}
            </span>
            <span className="text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>
        </div>

        <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-3">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-semibold">
            {product.category}
          </span>
        </div>

        {/* Botón de compra principal */}
        <button className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white py-4 lg:py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group">
          <ShoppingBag className="w-6 h-6" />
          <span>Agregar al Carrito</span>
          <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
} 