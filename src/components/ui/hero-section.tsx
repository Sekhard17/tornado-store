'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Play, TrendingUp, Star, Zap, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

const heroContent = [
  {
    id: 1,
    title: "NUEVA",
    subtitle: "COLECCIÓN",
    description: "Descubre las últimas tendencias en streetwear y moda urbana",
    badge: "NUEVA TEMPORADA",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
    gradient: "from-purple-600 via-pink-600 to-red-600"
  },
  {
    id: 2,
    title: "OFERTAS",
    subtitle: "INCREÍBLES",
    description: "Hasta 50% de descuento en tus marcas favoritas",
    badge: "SUPER OFERTAS",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=800&fit=crop",
    gradient: "from-blue-600 via-indigo-600 to-purple-600"
  },
  {
    id: 3,
    title: "ESTILO",
    subtitle: "PREMIUM",
    description: "Zapatillas y ropa de las mejores marcas internacionales",
    badge: "MARCAS EXCLUSIVAS",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=800&fit=crop",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600"
  }
];

const trendingSearches = ["Nike Air", "Hoodies", "Jordan", "Adidas", "Urban Style"];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsLoaded(true);
    
    // Auto slide
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Búsqueda:', searchQuery);
      // Aquí iría la lógica de búsqueda
    }
  };

  const current = heroContent[currentSlide];

  return (
    <section className="relative h-screen min-h-[100vh] overflow-hidden bg-gray-900">
      {/* Background con imagen y overlays */}
      <div className="absolute inset-0">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <Image
            src={current.image}
            alt="Hero Background"
            fill
            className="object-cover transition-all duration-1000 ease-out"
            priority
          />
        </div>
        
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Gradiente dinámico */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-30 transition-all duration-1000`}
        ></div>
        
        {/* Patrón de puntos */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Lado izquierdo - Contenido */}
            <div className="space-y-8">
              
              {/* Badge */}
              <div 
                className={`inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 ${isLoaded ? 'animate-slideInLeft' : 'opacity-0'}`}
                style={{ animationDelay: '0.2s' }}
              >
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-semibold">
                  {current.badge}
                </span>
              </div>

              {/* Título principal */}
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-8xl font-black text-white leading-none">
                  <div 
                    className={`${isLoaded ? 'animate-slideInLeft' : 'opacity-0'}`}
                    style={{ animationDelay: '0.4s' }}
                  >
                    {current.title}
                  </div>
                  <div 
                    className={`bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent ${isLoaded ? 'animate-slideInLeft' : 'opacity-0'}`}
                    style={{ animationDelay: '0.6s' }}
                  >
                    {current.subtitle}
                  </div>
                </h1>
                
                <p 
                  className={`text-xl text-gray-300 max-w-md ${isLoaded ? 'animate-slideInLeft' : 'opacity-0'}`}
                  style={{ animationDelay: '0.8s' }}
                >
                  {current.description}
                </p>
              </div>

              {/* Botones de acción */}
              <div 
                className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? 'animate-slideInLeft' : 'opacity-0'}`}
                style={{ animationDelay: '1s' }}
              >
                <button className={`group bg-gradient-to-r ${current.gradient} text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2`}>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Explorar Colección</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Ver Lookbook</span>
                </button>
              </div>

              {/* Stats */}
              <div 
                className={`flex space-x-8 ${isLoaded ? 'animate-slideInLeft' : 'opacity-0'}`}
                style={{ animationDelay: '1.2s' }}
              >
                <div className="text-center">
                  <div className="text-2xl font-black text-white">500+</div>
                  <div className="text-sm text-gray-400">Productos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-white">50+</div>
                  <div className="text-sm text-gray-400">Marcas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-white">24/7</div>
                  <div className="text-sm text-gray-400">Soporte</div>
                </div>
              </div>
            </div>

            {/* Lado derecho - Buscador */}
            <div className="space-y-8">
              
              {/* Buscador principal */}
              <div 
                className={`${isLoaded ? 'animate-slideInRight' : 'opacity-0'}`}
                style={{ animationDelay: '0.6s' }}
              >
                <form onSubmit={handleSearch} className="relative group">
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${current.gradient} rounded-3xl blur-lg opacity-25 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                    <div className="mb-6">
                      <h3 className="text-2xl font-black text-gray-900 mb-2">
                        ¿Qué buscas hoy?
                      </h3>
                      <p className="text-gray-600">
                        Encuentra tu estilo perfecto
                      </p>
                    </div>
                    
                    <div className="relative mb-6">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar productos, marcas..."
                        className="w-full px-6 py-4 bg-gray-100 rounded-2xl text-gray-900 placeholder-gray-500 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                      />
                      <button
                        type="submit"
                        className={`absolute right-2 top-2 bottom-2 bg-gradient-to-r ${current.gradient} text-white px-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg`}
                      >
                        <Search className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">Tendencias:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(search)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Card de promoción */}
              <div 
                className={`bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 ${isLoaded ? 'animate-slideInRight' : 'opacity-0'}`}
                style={{ animationDelay: '0.8s' }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 bg-gradient-to-r ${current.gradient} rounded-2xl`}>
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">
                      Envío Gratis
                    </h4>
                    <p className="text-gray-300 text-sm">
                      En compras sobre $50.000 a todo Chile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación de slides */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? `bg-gradient-to-r ${current.gradient}`
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* CSS personalizado */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
} 