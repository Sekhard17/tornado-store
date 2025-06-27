import { account, databases, DATABASE_ID, COLLECTIONS } from './appwrite';
import { ID, Models } from 'appwrite';

export interface Usuario {
  $id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  region?: string;
  codigoPostal?: string;
  fechaNacimiento?: string;
  preferencias?: string;
  activo: boolean;
  ultimoLogin?: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface DatosRegistro {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

export interface DatosLogin {
  email: string;
  password: string;
}

export interface SesionUsuario {
  usuario: Models.User<any>;
  perfil: Usuario;
}

class ServicioAuth {
  // Registrar nuevo usuario
  async registrarUsuario(datos: DatosRegistro): Promise<SesionUsuario> {
    try {
      // 1. Crear cuenta en Appwrite Auth
      const cuentaNueva = await account.create(
        ID.unique(),
        datos.email,
        datos.password,
        `${datos.nombre} ${datos.apellido}`
      );

      // 2. Iniciar sesión automáticamente
      const sesion = await account.createEmailPasswordSession(
        datos.email,
        datos.password
      );

      // 3. Crear perfil de usuario en la base de datos
      const perfilUsuario = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USUARIOS,
        cuentaNueva.$id, // Usar el mismo ID de la cuenta
        {
          nombre: datos.nombre,
          apellido: datos.apellido,
          email: datos.email,
          activo: true,
          ultimoLogin: new Date().toISOString()
        }
      );

      return {
        usuario: cuentaNueva,
        perfil: perfilUsuario as unknown as Usuario
      };
    } catch (error: any) {
      console.error('Error al registrar usuario:', error);
      throw this.manejarErrorAuth(error);
    }
  }

  // Iniciar sesión
  async iniciarSesion(datos: DatosLogin): Promise<SesionUsuario> {
    try {
      // 1. Crear sesión
      const sesion = await account.createEmailPasswordSession(
        datos.email,
        datos.password
      );

      // 2. Obtener datos del usuario
      const usuario = await account.get();

      // 3. Obtener perfil del usuario
      const perfil = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.USUARIOS,
        usuario.$id
      );

      // 4. Actualizar último login
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USUARIOS,
        usuario.$id,
        {
          ultimoLogin: new Date().toISOString()
        }
      );

      return {
        usuario,
        perfil: perfil as unknown as Usuario
      };
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      throw this.manejarErrorAuth(error);
    }
  }

  // Cerrar sesión
  async cerrarSesion(): Promise<void> {
    try {
      await account.deleteSession('current');
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
      throw this.manejarErrorAuth(error);
    }
  }

  // Obtener sesión actual
  async obtenerSesionActual(): Promise<SesionUsuario | null> {
    try {
      const usuario = await account.get();
      
      if (!usuario) return null;

      const perfil = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.USUARIOS,
        usuario.$id
      );

      return {
        usuario,
        perfil: perfil as unknown as Usuario
      };
    } catch (error) {
      // Si no hay sesión activa, devolver null
      return null;
    }
  }

  // Verificar si el usuario está autenticado
  async estaAutenticado(): Promise<boolean> {
    try {
      const usuario = await account.get();
      return !!usuario;
    } catch (error) {
      return false;
    }
  }

  // Actualizar perfil de usuario
  async actualizarPerfil(datosActualizacion: Partial<Usuario>): Promise<Usuario> {
    try {
      const usuario = await account.get();
      
      if (!usuario) {
        throw new Error('Usuario no autenticado');
      }

      const perfilActualizado = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USUARIOS,
        usuario.$id,
        datosActualizacion
      );

      return perfilActualizado as unknown as Usuario;
    } catch (error: any) {
      console.error('Error al actualizar perfil:', error);
      throw this.manejarErrorAuth(error);
    }
  }

  // Cambiar contraseña
  async cambiarContrasena(contrasenaActual: string, contrasenaNueva: string): Promise<void> {
    try {
      await account.updatePassword(contrasenaNueva, contrasenaActual);
    } catch (error: any) {
      console.error('Error al cambiar contraseña:', error);
      throw this.manejarErrorAuth(error);
    }
  }

  // Recuperar contraseña
  async recuperarContrasena(email: string): Promise<void> {
    try {
      await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
    } catch (error: any) {
      console.error('Error al recuperar contraseña:', error);
      throw this.manejarErrorAuth(error);
    }
  }

  // Confirmar recuperación de contraseña
  async confirmarRecuperacion(
    userId: string, 
    secret: string, 
    contrasenaNueva: string
  ): Promise<void> {
    try {
      await account.updateRecovery(userId, secret, contrasenaNueva);
    } catch (error: any) {
      console.error('Error al confirmar recuperación:', error);
      throw this.manejarErrorAuth(error);
    }
  }

  // Manejar errores de autenticación
  private manejarErrorAuth(error: any): Error {
    let mensaje = 'Ha ocurrido un error inesperado';

    switch (error.code) {
      case 401:
        mensaje = 'Email o contraseña incorrectos';
        break;
      case 409:
        mensaje = 'Ya existe una cuenta con este email';
        break;
      case 429:
        mensaje = 'Demasiados intentos. Intenta más tarde';
        break;
      case 400:
        if (error.message.includes('password')) {
          mensaje = 'La contraseña debe tener al menos 8 caracteres';
        } else if (error.message.includes('email')) {
          mensaje = 'Por favor ingresa un email válido';
        }
        break;
      default:
        mensaje = error.message || mensaje;
    }

    return new Error(mensaje);
  }
}

// Exportar instancia única
export const servicioAuth = new ServicioAuth(); 