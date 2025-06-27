import { useState } from 'react';
import { servicioAuth } from '@/lib/auth';

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

export const useLoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    general: ''
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      general: ''
    };

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validaciones para registro
    if (!isLogin) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'El nombre es requerido';
      }
      
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'El apellido es requerido';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirma tu contraseña';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: '',
        general: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors(prev => ({ ...prev, general: '' }));

    try {
      if (isLogin) {
        // Iniciar sesión
        console.log('Iniciando sesión...');
        const sesion = await servicioAuth.iniciarSesion({
          email: formData.email,
          password: formData.password
        });
        
        console.log('Sesión iniciada exitosamente:', sesion.perfil);
        
        // Redireccionar al usuario después del login exitoso
        window.location.href = '/';
        
      } else {
        // Registrar nuevo usuario
        console.log('Registrando usuario...');
        const sesion = await servicioAuth.registrarUsuario({
          nombre: formData.firstName,
          apellido: formData.lastName,
          email: formData.email,
          password: formData.password
        });
        
        console.log('Usuario registrado exitosamente:', sesion.perfil);
        
        // Redireccionar al usuario después del registro exitoso
        window.location.href = '/';
      }
      
    } catch (error: any) {
      console.error('Error de autenticación:', error);
      setErrors(prev => ({
        ...prev,
        general: error.message || 'Hubo un error. Por favor intenta nuevamente.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (mode: boolean) => {
    setIsLogin(mode);
    setErrors({
      email: '', password: '', confirmPassword: '', 
      firstName: '', lastName: '', general: ''
    });
  };

  return {
    isLogin,
    isLoading,
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    switchMode
  };
}; 