import { Mail, Lock, User } from 'lucide-react';
import { FormInput } from './form-input';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  general: string;
}

interface LoginFormProps {
  isLogin: boolean;
  isLoading: boolean;
  formData: FormData;
  errors: FormErrors;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({ 
  isLogin, 
  isLoading, 
  formData, 
  errors, 
  onInputChange, 
  onSubmit 
}: LoginFormProps) {
  return (
    <>
      {/* Error general */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <p className="text-sm text-red-600 dark:text-red-400 font-medium text-center">
            {errors.general}
          </p>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={onSubmit} className="space-y-6" noValidate>
        {/* Campos de registro */}
        {!isLogin && (
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="NOMBRE"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={onInputChange}
              placeholder="Tu nombre"
              error={errors.firstName}
              focusColor="purple"
            />
            <FormInput
              label="APELLIDO"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={onInputChange}
              placeholder="Tu apellido"
              error={errors.lastName}
              focusColor="purple"
            />
          </div>
        )}

        {/* Email */}
        <FormInput
          label="EMAIL"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          placeholder="tu@email.com"
          error={errors.email}
          icon={Mail}
          focusColor="blue"
        />

        {/* Contraseña */}
        <FormInput
          label="CONTRASEÑA"
          name="password"
          type="password"
          value={formData.password}
          onChange={onInputChange}
          placeholder="Tu contraseña"
          error={errors.password}
          icon={Lock}
          focusColor="blue"
        />

        {/* Confirmar contraseña */}
        {!isLogin && (
          <FormInput
            label="CONFIRMAR CONTRASEÑA"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={onInputChange}
            placeholder="Confirma tu contraseña"
            error={errors.confirmPassword}
            icon={Lock}
            focusColor="purple"
          />
        )}

        {/* Recordar / Olvidé contraseña */}
        {isLogin && (
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">Recordarme</span>
            </label>
            <button
              type="button"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}

        {/* Botón de submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 bg-gradient-to-r ${
            isLogin 
              ? 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
              : 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
          } text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 flex items-center justify-center space-x-2`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>PROCESANDO...</span>
            </>
          ) : (
            <span>{isLogin ? 'INICIAR SESIÓN' : 'CREAR CUENTA'}</span>
          )}
        </button>
      </form>
    </>
  );
} 