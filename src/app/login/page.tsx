'use client';

import { User } from 'lucide-react';
import Link from 'next/link';
import { LoginHeader, LoginTabs, LoginForm } from '@/components/ui/auth';
import { useLoginForm } from '@/hooks/useLoginForm';

export default function LoginPage() {
  const {
    isLogin,
    isLoading,
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    switchMode
  } = useLoginForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Header */}
      <LoginHeader />

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card principal */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
            {/* Header del formulario */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                {isLogin ? '¡Bienvenido!' : '¡Únete a nosotros!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {isLogin 
                  ? 'Inicia sesión para acceder a tu cuenta'
                  : 'Crea tu cuenta y descubre las mejores ofertas'
                }
              </p>
            </div>

            {/* Tabs */}
            <LoginTabs isLogin={isLogin} onSwitchMode={switchMode} />

            {/* Formulario */}
            <LoginForm
              isLogin={isLogin}
              isLoading={isLoading}
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Al crear una cuenta, aceptas nuestros{' '}
              <Link href="/terminos" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Términos y Condiciones
              </Link>{' '}
              y{' '}
              <Link href="/privacidad" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Política de Privacidad
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
} 