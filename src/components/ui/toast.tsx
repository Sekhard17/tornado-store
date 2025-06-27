'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { ToastType } from '@/types';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-600 dark:text-green-400',
    titleColor: 'text-green-800 dark:text-green-200',
    messageColor: 'text-green-700 dark:text-green-300',
    progressColor: 'bg-green-500',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-600 dark:text-red-400',
    titleColor: 'text-red-800 dark:text-red-200',
    messageColor: 'text-red-700 dark:text-red-300',
    progressColor: 'bg-red-500',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    iconColor: 'text-orange-600 dark:text-orange-400',
    titleColor: 'text-orange-800 dark:text-orange-200',
    messageColor: 'text-orange-700 dark:text-orange-300',
    progressColor: 'bg-orange-500',
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    titleColor: 'text-blue-800 dark:text-blue-200',
    messageColor: 'text-blue-700 dark:text-blue-300',
    progressColor: 'bg-blue-500',
  },
};

export function Toast({ toast, onRemove }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const config = toastConfig[toast.type];
  const Icon = config.icon;

  useEffect(() => {
    // Animación de entrada
    setTimeout(() => setIsVisible(true), 50);

    // Barra de progreso
    if (toast.duration && toast.duration > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const decrement = 100 / (toast.duration! / 100);
          return Math.max(0, prev - decrement);
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [toast.duration]);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl border backdrop-blur-md shadow-lg
        transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${config.bgColor} ${config.borderColor}
        max-w-md w-full
      `}
    >
      {/* Barra de progreso */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute top-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full">
          <div
            className={`h-full transition-all duration-100 ease-linear ${config.progressColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="p-4 pt-5">
        <div className="flex items-start space-x-3">
          {/* Icono */}
          <div className="flex-shrink-0">
            <Icon className={`w-6 h-6 ${config.iconColor}`} />
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-bold ${config.titleColor} tracking-wide`}>
              {toast.title}
            </p>
            {toast.message && (
              <p className={`mt-1 text-sm ${config.messageColor} leading-relaxed`}>
                {toast.message}
              </p>
            )}
            {toast.action && (
              <button
                onClick={toast.action.onClick}
                className={`mt-3 text-sm font-bold ${config.iconColor} hover:underline transition-all duration-200`}
              >
                {toast.action.label}
              </button>
            )}
          </div>

          {/* Botón cerrar */}
          <button
            onClick={handleRemove}
            className={`
              flex-shrink-0 p-1.5 rounded-lg transition-all duration-200
              hover:bg-black/5 dark:hover:bg-white/5
              ${config.iconColor} opacity-70 hover:opacity-100
            `}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 