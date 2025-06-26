'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 group"
      aria-label="Cambiar tema"
    >
      <div className="relative w-6 h-6">
        {/* Icono Sol - visible en tema claro */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-75'
        }`}>
          <Sun className="w-6 h-6 text-yellow-500" />
        </div>
        
        {/* Icono Luna - visible en tema oscuro */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'
        }`}>
          <Moon className="w-6 h-6 text-blue-400" />
        </div>
      </div>
      
      {/* Tooltip */}
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
      </span>
    </button>
  );
} 