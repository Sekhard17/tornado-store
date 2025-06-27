'use client';

import { Heart, ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import { ProductCardProps } from './types';

export function ProductCard({ 
  product, 
  favorites, 
  onToggleFavorite, 
  variant = 'default' 
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (variant === 'compact') {
    return (
      <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex">
          {/* Imagen del producto */}
          <div className="relative w-24 sm:w-28 lg:w-32 aspect-square overflow-hidden flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Badges compactos */}
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              {product.isNew && (
                <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                  NEW
                </span>
              )}
              {product.discount > 0 && (
                <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                  -{product.discount}%
                </span>
              )}
            </div>
          </div>

          {/* Información del producto */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
                  {product.brand}
                </span>
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`p-1.5 rounded-lg transition-all duration-300 ${
                    favorites.includes(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart className="w-3 h-3" />
                </button>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white text-sm lg:text-base mb-2 line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center space-x-1 mb-2">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {product.rating}
                </span>
                <span className="text-xs text-gray-500">
                  ({product.reviews})
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-black text-gray-900 dark:text-white text-sm lg:text-base">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              
              <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-2 rounded-lg hover:scale-110 transition-all duration-300 shadow-lg">
                <ShoppingBag className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50">
        {/* Imagen del producto */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-1">
            {product.isNew && (
              <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                NUEVO
              </span>
            )}
            {product.discount > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Botones de acción */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => onToggleFavorite(product.id)}
              className={`p-2 rounded-lg backdrop-blur-md border border-white/20 transition-all duration-300 ${
                favorites.includes(product.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className="w-3 h-3" />
            </button>
          </div>

          {/* Overlay de compra rápida */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform duration-300 shadow-lg flex items-center justify-center space-x-2">
              <ShoppingBag className="w-3 h-3" />
              <span>Comprar</span>
            </button>
          </div>
        </div>

        {/* Información del producto */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
              {product.brand}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {product.rating}
              </span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-lg font-black text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Variante default - tarjeta estándar
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
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
            onClick={() => onToggleFavorite(product.id)}
            className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 ${
              favorites.includes(product.id)
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
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
  );
} 