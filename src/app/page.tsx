import { Star, Truck, Shield } from 'lucide-react';
import { Navbar, HeroSection, FeaturedProducts } from '@/components/ui';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Featured Categories */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Categorías Destacadas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hombre */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 h-96 group">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                <h4 className="text-4xl font-bold mb-4">Hombre</h4>
                <p className="text-lg text-center mb-6 opacity-90">
                  Ropa urbana, zapatillas deportivas y accesorios modernos
                </p>
                <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Explorar Colección
                </button>
              </div>
              <div className="absolute bottom-0 right-0 opacity-10 text-white text-8xl font-bold transform rotate-12 translate-x-8 translate-y-4">
                ♂
              </div>
            </div>

            {/* Mujer */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 h-96 group">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                <h4 className="text-4xl font-bold mb-4">Mujer</h4>
                <p className="text-lg text-center mb-6 opacity-90">
                  Moda femenina, zapatillas trendy y accesorios únicos
                </p>
                <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Explorar Colección
                </button>
              </div>
              <div className="absolute bottom-0 right-0 opacity-10 text-white text-8xl font-bold transform rotate-12 translate-x-8 translate-y-4">
                ♀
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Envío a Todo Chile</h3>
              <p className="text-gray-600 dark:text-gray-300">Entregamos tus productos favoritos directamente a tu puerta</p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Compra Segura</h3>
              <p className="text-gray-600 dark:text-gray-300">Garantía de calidad y autenticidad en todos nuestros productos</p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Calidad Premium</h3>
              <p className="text-gray-600 dark:text-gray-300">Solo trabajamos con las mejores marcas y materiales</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            ¿Listo para renovar tu estilo?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Únete a miles de clientes satisfechos y encuentra tu look perfecto
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Explorar Catálogo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <h3 className="text-lg font-bold">Tornado Store</h3>
              </div>
              <p className="text-gray-400">
                La mejor tienda de moda urbana y streetwear en Chile.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Productos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Ropa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Zapatillas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accesorios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ofertas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Devoluciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <p className="text-gray-400 mb-2">¡Únete a nuestra comunidad!</p>
              <p className="text-sm text-gray-500">
                WhatsApp: +56 9 1234 5678
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Tornado Store. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
