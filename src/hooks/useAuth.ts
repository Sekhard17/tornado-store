'use client';

import { useState, useEffect } from 'react';
import { servicioAuth } from '@/lib/auth';

interface Usuario {
  $id: string;
  name: string;
  email: string;
}

interface PerfilUsuario {
  $id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
}

export function useAuth() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    verificarAutenticacion();
  }, []);

  const verificarAutenticacion = async () => {
    try {
      setCargando(true);
      const resultado = await servicioAuth.obtenerSesionActual();
      
      if (resultado && resultado.usuario && resultado.perfil) {
        setUsuario(resultado.usuario);
        setPerfil(resultado.perfil);
      } else {
        setUsuario(null);
        setPerfil(null);
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      setUsuario(null);
      setPerfil(null);
    } finally {
      setCargando(false);
    }
  };

  const logout = async () => {
    try {
      await servicioAuth.cerrarSesion();
      setUsuario(null);
      setPerfil(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  const estaAutenticado = !!usuario;
  const nombreCompleto = perfil ? `${perfil.nombre} ${perfil.apellido}` : usuario?.name || '';
  const iniciales = nombreCompleto
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return {
    usuario,
    perfil,
    cargando,
    estaAutenticado,
    nombreCompleto,
    iniciales,
    logout,
    verificarAutenticacion
  };
} 