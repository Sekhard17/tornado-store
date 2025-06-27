'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Toast } from './toast';
import { useToast } from '@/components/providers/toast-provider';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col space-y-3 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onRemove={removeToast} />
        </div>
      ))}
    </div>,
    document.body
  );
} 