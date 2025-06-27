'use client';

import { useState, useCallback } from 'react';
import { ToastType } from '@/types';

export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback((toast: Omit<ToastType, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastType = {
      id,
      duration: 5000, // 5 segundos por defecto
      ...toast,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove después de la duración especificada
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Métodos de conveniencia para diferentes tipos de toast
  const success = useCallback((title: string, message?: string, options?: Partial<ToastType>) => {
    return addToast({
      type: 'success',
      title,
      message,
      ...options,
    });
  }, [addToast]);

  const error = useCallback((title: string, message?: string, options?: Partial<ToastType>) => {
    return addToast({
      type: 'error',
      title,
      message,
      duration: 7000, // Errores duran más tiempo
      ...options,
    });
  }, [addToast]);

  const warning = useCallback((title: string, message?: string, options?: Partial<ToastType>) => {
    return addToast({
      type: 'warning',
      title,
      message,
      ...options,
    });
  }, [addToast]);

  const info = useCallback((title: string, message?: string, options?: Partial<ToastType>) => {
    return addToast({
      type: 'info',
      title,
      message,
      ...options,
    });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info,
  };
} 