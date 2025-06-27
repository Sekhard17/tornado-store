'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useToast as useToastHook } from '@/hooks/useToast';
import { ToastContainer } from '@/components/ui/toast-container';
import { ToastContextType } from '@/types';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const toastMethods = useToastHook();

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast debe ser usado dentro de un ToastProvider');
  }
  return context;
} 