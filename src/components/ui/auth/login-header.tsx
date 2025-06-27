import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/components/providers/theme-provider';

export function LoginHeader() {
  const { theme } = useTheme();

  return (
    <header className="p-6 flex items-center justify-between">
      <Link 
        href="/" 
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Volver a la tienda</span>
      </Link>
      
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 relative">
          <Image
            src={theme === 'dark' ? '/tornado_oscuro.png' : '/tornado_claro.png'}
            alt="Tornado Store"
            fill
            className="object-contain"
          />
        </div>
        <span className="font-black text-xl text-gray-900 dark:text-white">TORNADO</span>
      </div>
    </header>
  );
} 