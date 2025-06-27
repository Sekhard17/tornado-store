'use client';

import { useState } from 'react';
import { Bell, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { useToast } from '@/components/providers/toast-provider';

export function ToastDemo() {
  const { success, error, warning, info } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    success(
      '¡Producto agregado!',
      'El producto se ha agregado exitosamente al carrito.',
      {
        action: {
          label: 'Ver carrito',
          onClick: () => console.log('Navegar al carrito'),
        },
      }
    );
  };

  const handleError = () => {
    error(
      'Error de conexión',
      'No se pudo conectar con el servidor. Por favor, inténtalo de nuevo.',
      {
        action: {
          label: 'Reintentar',
          onClick: () => console.log('Reintentando...'),
        },
      }
    );
  };

  const handleWarning = () => {
    warning(
      'Stock limitado',
      'Solo quedan 3 unidades de este producto en stock.'
    );
  };

  const handleInfo = () => {
    info(
      'Nueva actualización',
      'Hemos agregado nuevas funciones a la tienda.',
      {
        duration: 10000, // 10 segundos
      }
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        title="Probar toasts"
      >
        <Bell className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
          Demo de Toasts
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleSuccess}
          className="w-full flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
        >
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-800 dark:text-green-200">
            Toast de Éxito
          </span>
        </button>

        <button
          onClick={handleError}
          className="w-full flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-sm font-medium text-red-800 dark:text-red-200">
            Toast de Error
          </span>
        </button>

        <button
          onClick={handleWarning}
          className="w-full flex items-center space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
        >
          <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
            Toast de Advertencia
          </span>
        </button>

        <button
          onClick={handleInfo}
          className="w-full flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
        >
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Toast de Información
          </span>
        </button>
      </div>
    </div>
  );
} 