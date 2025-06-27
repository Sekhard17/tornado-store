import { useState } from 'react';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

interface FormInputProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  icon?: LucideIcon;
  focusColor?: 'blue' | 'purple' | 'red';
}

export function FormInput({ 
  label, 
  name, 
  type, 
  value, 
  onChange, 
  placeholder, 
  error, 
  icon: Icon,
  focusColor = 'blue'
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const getFocusColorClass = () => {
    if (error) return 'border-red-300 dark:border-red-600 focus:ring-red-500';
    
    switch (focusColor) {
      case 'purple':
        return 'border-gray-200 dark:border-gray-600 focus:ring-purple-500';
      case 'blue':
        return 'border-gray-200 dark:border-gray-600 focus:ring-blue-500';
      default:
        return 'border-gray-200 dark:border-gray-600 focus:ring-blue-500';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        )}
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${Icon ? 'pl-10' : 'px-4'} ${isPassword ? 'pr-12' : 'pr-4'} py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all ${getFocusColorClass()}`}
          placeholder={placeholder}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 font-medium">
          {error}
        </p>
      )}
    </div>
  );
} 