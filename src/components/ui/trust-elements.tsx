'use client';

import { Truck, Shield, Star, Clock, Award, Headphones } from 'lucide-react';

const trustItems = [
  {
    icon: Truck,
    title: "Envío Gratuito",
    description: "Delivery gratis en compras sobre $30.000 a todo Chile",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    icon: Shield,
    title: "Compra Segura",
    description: "Protección total en tus pagos y garantía de autenticidad",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
    iconColor: "text-emerald-600 dark:text-emerald-400"
  },
  {
    icon: Award,
    title: "Calidad Premium",
    description: "Solo las mejores marcas y materiales de primera calidad",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/50",
    iconColor: "text-amber-600 dark:text-amber-400"
  }
];

export function TrustElements() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header sutil */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">
            <Star className="w-4 h-4" />
            <span>CONFIANZA GARANTIZADA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Tu tranquilidad es nuestra prioridad
          </h2>
        </div>

        {/* Grid de elementos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 dark:border-gray-800"
                style={{
                  animation: `slideInUp 0.6s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Gradiente sutil de fondo */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                
                {/* Contenido */}
                <div className="relative">
                  {/* Icono */}
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 lg:w-8 lg:h-8 ${item.iconColor}`} />
                  </div>

                  {/* Título */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Elemento decorativo */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats adicionales */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 lg:mt-16">
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1">15K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Clientes felices</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1">99%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Satisfacción</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Soporte</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-1">4.9★</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Rating promedio</div>
          </div>
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