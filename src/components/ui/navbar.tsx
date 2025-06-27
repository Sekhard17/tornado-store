'use client';

import { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Menu, X, ChevronDown, User, Search, LogOut, Settings, Package, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { useCartStore } from '@/store/useCartStore';
import { useTheme } from '@/components/providers/theme-provider';
import { useAuth } from '@/hooks/useAuth';

interface Category {
  name: string;
  href: string;
  subcategories?: { name: string; href: string }[];
}

const categories = {
  hombre: [
    {
      name: 'ROPA',
      href: '/hombre/ropa',
      subcategories: [
        { name: 'Poleras', href: '/hombre/ropa/poleras' },
        { name: 'Pantalones', href: '/hombre/ropa/pantalones' },
        { name: 'Hoodies', href: '/hombre/ropa/hoodies' },
        { name: 'Jeans', href: '/hombre/ropa/jeans' },
        { name: 'Shorts', href: '/hombre/ropa/shorts' },
        { name: 'Chaquetas', href: '/hombre/ropa/chaquetas' },
      ]
    },
    {
      name: 'ZAPATILLAS',
      href: '/hombre/zapatillas',
      subcategories: [
        { name: 'Deportivas', href: '/hombre/zapatillas/deportivas' },
        { name: 'Urbanas', href: '/hombre/zapatillas/urbanas' },
        { name: 'Running', href: '/hombre/zapatillas/running' },
        { name: 'Basketball', href: '/hombre/zapatillas/basketball' },
        { name: 'Skateboarding', href: '/hombre/zapatillas/skateboarding' },
      ]
    },
    {
      name: 'ACCESORIOS',
      href: '/hombre/accesorios',
      subcategories: [
        { name: 'Gorros', href: '/hombre/accesorios/gorros' },
        { name: 'Mochilas', href: '/hombre/accesorios/mochilas' },
        { name: 'Relojes', href: '/hombre/accesorios/relojes' },
        { name: 'Lentes', href: '/hombre/accesorios/lentes' },
        { name: 'Billeteras', href: '/hombre/accesorios/billeteras' },
      ]
    }
  ],
  mujer: [
    {
      name: 'ROPA',
      href: '/mujer/ropa',
      subcategories: [
        { name: 'Blusas', href: '/mujer/ropa/blusas' },
        { name: 'Vestidos', href: '/mujer/ropa/vestidos' },
        { name: 'Pantalones', href: '/mujer/ropa/pantalones' },
        { name: 'Jeans', href: '/mujer/ropa/jeans' },
        { name: 'Crop Tops', href: '/mujer/ropa/crop-tops' },
        { name: 'Chaquetas', href: '/mujer/ropa/chaquetas' },
      ]
    },
    {
      name: 'ZAPATILLAS',
      href: '/mujer/zapatillas',
      subcategories: [
        { name: 'Deportivas', href: '/mujer/zapatillas/deportivas' },
        { name: 'Urbanas', href: '/mujer/zapatillas/urbanas' },
        { name: 'Running', href: '/mujer/zapatillas/running' },
        { name: 'Casuales', href: '/mujer/zapatillas/casuales' },
        { name: 'Plataformas', href: '/mujer/zapatillas/plataformas' },
      ]
    },
    {
      name: 'ACCESORIOS',
      href: '/mujer/accesorios',
      subcategories: [
        { name: 'Carteras', href: '/mujer/accesorios/carteras' },
        { name: 'Joyas', href: '/mujer/accesorios/joyas' },
        { name: 'Lentes', href: '/mujer/accesorios/lentes' },
        { name: 'Gorros', href: '/mujer/accesorios/gorros' },
        { name: 'Pañuelos', href: '/mujer/accesorios/panuelos' },
      ]
    }
  ]
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout>();
  const { getTotalItems } = useCartStore();
  const { theme } = useTheme();
  const { estaAutenticado, nombreCompleto, iniciales, logout, cargando } = useAuth();

  const handleMouseEnter = (dropdown: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) {
        clearTimeout(dropdownTimeout.current);
      }
    };
  }, []);

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-24 h-24 relative">
              <Image
                src={theme === 'dark' ? '/tornado_oscuro.png' : '/tornado_claro.png'}
                alt="Tornado Store Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* <div className="flex flex-col">
              <h1 className="text-2xl font-black text-gray-900 dark:text-white leading-none tracking-tight">TORNADO</h1>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 leading-none tracking-widest">STORE</span>
            </div> */}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <a href="/" className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 tracking-wide uppercase">
              INICIO
            </a>
            
            {/* Hombre Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('hombre')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 tracking-wide uppercase">
                <span>HOMBRE</span>
                <ChevronDown className={`w-4 h-4 transition-all duration-300 ${
                  activeDropdown === 'hombre' ? 'rotate-180 text-blue-600' : ''
                }`} />
              </button>
              
              {activeDropdown === 'hombre' && (
                <div className="absolute top-full left-1/2 ml-[-400px] mt-3 w-[800px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 animate-fade-in-up">
                  <div className="grid grid-cols-3 gap-8">
                    {categories.hombre.map((category) => (
                      <div key={category.name} className="space-y-4">
                        <a 
                          href={category.href}
                          className="block text-lg font-black text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors tracking-wide"
                        >
                          {category.name}
                        </a>
                        {category.subcategories && (
                          <div className="space-y-3">
                            {category.subcategories.map((sub) => (
                              <a
                                key={sub.name}
                                href={sub.href}
                                className="block text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:translate-x-2 hover:font-medium"
                              >
                                {sub.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-center space-x-8">
                      <a href="/hombre/nuevos" className="text-sm font-bold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors">
                        NUEVOS PRODUCTOS
                      </a>
                      <a href="/hombre/ofertas" className="text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
                        OFERTAS ESPECIALES
                      </a>
                      <a href="/hombre/marcas" className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                        MARCAS PREMIUM
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mujer Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('mujer')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 tracking-wide uppercase">
                <span>MUJER</span>
                <ChevronDown className={`w-4 h-4 transition-all duration-300 ${
                  activeDropdown === 'mujer' ? 'rotate-180 text-purple-600' : ''
                }`} />
              </button>
              
              {activeDropdown === 'mujer' && (
                <div className="absolute top-full left-1/2 ml-[-400px] mt-3 w-[800px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 animate-fade-in-up">
                  <div className="grid grid-cols-3 gap-8">
                    {categories.mujer.map((category) => (
                      <div key={category.name} className="space-y-4">
                        <a 
                          href={category.href}
                          className="block text-lg font-black text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors tracking-wide"
                        >
                          {category.name}
                        </a>
                        {category.subcategories && (
                          <div className="space-y-3">
                            {category.subcategories.map((sub) => (
                              <a
                                key={sub.name}
                                href={sub.href}
                                className="block text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 hover:translate-x-2 hover:font-medium"
                              >
                                {sub.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-center space-x-8">
                      <a href="/mujer/nuevos" className="text-sm font-bold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors">
                        NUEVOS PRODUCTOS
                      </a>
                      <a href="/mujer/ofertas" className="text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
                        OFERTAS ESPECIALES
                      </a>
                      <a href="/mujer/marcas" className="text-sm font-bold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors">
                        MARCAS PREMIUM
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="/ofertas" className="text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300 tracking-wide uppercase">
              OFERTAS
            </a>
            
            <a href="/contacto" className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 tracking-wide uppercase">
              CONTACTO
            </a>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Search className="w-5 h-5" />
            </button>

            <ThemeToggle />
            
            {/* User Dropdown */}
            {!cargando && (
              <div className="relative">
                {estaAutenticado ? (
                  <div
                    className="relative"
                    onMouseEnter={() => handleMouseEnter('usuario')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {iniciales}
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-all duration-300 ${
                        activeDropdown === 'usuario' ? 'rotate-180 text-blue-600' : ''
                      }`} />
                    </button>
                    
                    {activeDropdown === 'usuario' && (
                      <div className="absolute top-full right-0 mt-2 w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-4 animate-fade-in-up">
                        {/* Header del dropdown */}
                        <div className="px-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                              {iniciales}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white text-sm">{nombreCompleto}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Tornado Store</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Menu items */}
                        <div className="py-2">
                          <Link 
                            href="/perfil"
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Mi Perfil</span>
                          </Link>
                          
                          <Link 
                            href="/pedidos"
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                          >
                            <Package className="w-4 h-4" />
                            <span>Mis Pedidos</span>
                          </Link>
                          
                          <Link 
                            href="/favoritos"
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                          >
                            <Heart className="w-4 h-4" />
                            <span>Favoritos</span>
                          </Link>
                          
                          <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                          
                          <button 
                            onClick={logout}
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Cerrar Sesión</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    href="/login" 
                    className="p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                )}
              </div>
            )}
            
            <button className="relative p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="hidden lg:block py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full px-4 py-3 pl-10 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg">
            {/* Mobile Search */}
            <div className="mb-6 px-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-3 pl-10 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>

            <div className="space-y-6">
              <a href="/" className="block text-lg font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors tracking-wide uppercase">
                INICIO
              </a>
              
              <div className="space-y-4">
                <div>
                  <span className="block text-lg font-black text-blue-600 dark:text-blue-400 mb-3 tracking-wide uppercase">HOMBRE</span>
                  <div className="ml-4 space-y-3">
                    {categories.hombre.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <a href={category.href} className="block text-base font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors tracking-wide">
                          {category.name}
                        </a>
                        {category.subcategories && (
                          <div className="ml-4 space-y-1">
                            {category.subcategories.slice(0, 3).map((sub) => (
                              <a
                                key={sub.name}
                                href={sub.href}
                                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                {sub.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-lg font-black text-purple-600 dark:text-purple-400 mb-3 tracking-wide uppercase">MUJER</span>
                  <div className="ml-4 space-y-3">
                    {categories.mujer.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <a href={category.href} className="block text-base font-bold text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors tracking-wide">
                          {category.name}
                        </a>
                        {category.subcategories && (
                          <div className="ml-4 space-y-1">
                            {category.subcategories.slice(0, 3).map((sub) => (
                              <a
                                key={sub.name}
                                href={sub.href}
                                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                              >
                                {sub.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a href="/ofertas" className="block text-lg font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors tracking-wide uppercase">
                OFERTAS
              </a>
              
              <a href="/contacto" className="block text-lg font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors tracking-wide uppercase">
                CONTACTO
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 