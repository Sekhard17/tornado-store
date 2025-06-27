'use client';

import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ArrowUp, Heart } from 'lucide-react';

const footerLinks = {
  products: [
    { name: "Zapatillas", href: "#" },
    { name: "Ropa Urbana", href: "#" },
    { name: "Accesorios", href: "#" },
    { name: "Ofertas", href: "#" },
    { name: "Nuevos Lanzamientos", href: "#" }
  ],
  support: [
    { name: "Centro de Ayuda", href: "#" },
    { name: "Guía de Tallas", href: "#" },
    { name: "Envíos y Devoluciones", href: "#" },
    { name: "Garantías", href: "#" },
    { name: "Contacto", href: "#" }
  ],
  company: [
    { name: "Sobre Nosotros", href: "#" },
    { name: "Trabajar con Nosotros", href: "#" },
    { name: "Términos y Condiciones", href: "#" },
    { name: "Política de Privacidad", href: "#" },
    { name: "Blog", href: "#" }
  ]
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-400" },
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-400" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" }
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main footer content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Brand section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-4">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-lg">T</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">Tornado Store</h3>
                </div>
                
                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                  La tienda líder en moda urbana y streetwear en Chile. Encuentra tu estilo único con las mejores marcas y tendencias.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+56 9 1234 5678</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>hola@tornadostore.cl</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Santiago, Chile</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links sections */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Products */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white mb-6">Productos</h4>
                <ul className="space-y-3">
                  {footerLinks.products.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white mb-6">Soporte</h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white mb-6">Empresa</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-bold text-white mb-2">
                ¡Mantente al día con las últimas tendencias!
              </h4>
              <p className="text-gray-400">
                Suscríbete y recibe ofertas exclusivas y novedades antes que nadie
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 min-w-0 sm:min-w-[250px]"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>© 2024 Tornado Store. Hecho con</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>en Chile</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Términos
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacidad
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
} 