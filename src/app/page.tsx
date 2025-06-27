import { Navbar, HeroSection, FeaturedProducts, TrustElements, Footer } from '@/components/ui';
import { ToastDemo } from '@/components/ui/toast-demo';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Trust Elements */}
      <TrustElements />

      {/* Footer */}
      <Footer />

      {/* Toast Demo */}
      <ToastDemo />
    </main>
  );
}
