# 🌪️ Configuración de Appwrite para Tornado Store

Esta guía te ayudará a configurar completamente la base de datos de Appwrite para tu tienda Tornado Store.

## 📋 Requisitos Previos

1. **Cuenta de Appwrite**: Crea una cuenta gratuita en [Appwrite Cloud](https://cloud.appwrite.io)
2. **Proyecto creado**: Crea un nuevo proyecto en tu dashboard de Appwrite
3. **API Key**: Genera una API Key con permisos de administrador

## 🚀 Configuración Paso a Paso

### 1. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura tus variables:

```bash
cp env.example .env.local
```

Edita `.env.local` con tus datos reales:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=tu-project-id-aqui

# Appwrite Admin (para scripts de setup)
APPWRITE_API_KEY=tu-api-key-aqui

# Database Configuration
NEXT_PUBLIC_DATABASE_ID=tornado-store-db
NEXT_PUBLIC_USERS_COLLECTION_ID=usuarios
NEXT_PUBLIC_PRODUCTS_COLLECTION_ID=productos
NEXT_PUBLIC_ORDERS_COLLECTION_ID=pedidos
NEXT_PUBLIC_CATEGORIES_COLLECTION_ID=categorias
NEXT_PUBLIC_CART_COLLECTION_ID=carrito
```

### 2. Obtener tu API Key

1. Ve a tu proyecto en [Appwrite Console](https://cloud.appwrite.io/console)
2. Navega a **Settings** → **API Keys**
3. Clic en **Create API Key**
4. Dale un nombre como "Setup Script"
5. Selecciona los siguientes scopes:
   - `databases.read`
   - `databases.write`
   - `collections.read`
   - `collections.write`
   - `attributes.read`
   - `attributes.write`
   - `indexes.read`
   - `indexes.write`
6. Copia la API Key generada

### 3. Ejecutar el Script de Configuración

Una vez que tengas todo configurado, ejecuta:

```bash
pnpm setup-db
```

¡Eso es todo! El script creará automáticamente:

## 📊 Estructura de la Base de Datos

### Colecciones Creadas

1. **usuarios** - Perfiles de usuarios registrados
2. **categorias** - Categorías y subcategorías de productos
3. **productos** - Catálogo completo de productos
4. **pedidos** - Historial de órdenes y compras
5. **carrito** - Carritos de compra temporales

### Campos Principales

#### 👤 Usuarios
- `nombre`, `apellido`, `email`
- `telefono`, `direccion`, `ciudad`, `region`
- `fechaNacimiento`, `preferencias`
- `activo`, `ultimoLogin`

#### 🏷️ Categorías
- `nombre`, `slug`, `descripcion`, `imagen`
- `genero` (hombre/mujer/unisex)
- `tipo` (ropa/zapatillas/accesorios)
- `categoriaPadre`, `orden`

#### 👕 Productos
- `nombre`, `slug`, `descripcion`, `sku`
- `precio`, `precioOriginal`, `stock`
- `categoria`, `marca`, `genero`
- `colores`, `tallas`, `imagenes`
- `destacado`, `enOferta`, `activo`
- `puntuacion`, `numeroReseñas`

#### 📦 Pedidos
- `usuarioId`, `numeroPedido`
- `estado` (pendiente/confirmado/enviado/entregado)
- `productos`, `subtotal`, `impuesto`, `envio`, `total`
- `metodoPago`, `estadoPago`
- `direccionEnvio`, `numeroSeguimiento`

#### 🛒 Carrito
- `usuarioId`, `productoId`
- `nombreProducto`, `precio`, `cantidad`
- `talla`, `color`, `atributos`

## 🔐 Permisos Configurados

- **Lectura pública**: Productos y categorías son visibles para todos
- **Usuarios autenticados**: Pueden gestionar su carrito y pedidos
- **Solo administradores**: Pueden crear/editar productos y categorías

## 🛠️ Uso en el Código

Después de la configuración, puedes usar los servicios así:

```typescript
import { servicioAuth } from '@/lib/auth';
import { COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';

// Registrar usuario
const sesion = await servicioAuth.registrarUsuario({
  nombre: 'Juan',
  apellido: 'Pérez',
  email: 'juan@example.com',
  password: 'mipassword123'
});

// Iniciar sesión
const sesion = await servicioAuth.iniciarSesion({
  email: 'juan@example.com',
  password: 'mipassword123'
});
```

## 🚨 Solución de Problemas

### Error: "APPWRITE_API_KEY no está configurado"
- Verifica que tu archivo `.env.local` existe
- Asegúrate de que la variable `APPWRITE_API_KEY` está definida

### Error: "Project not found"
- Verifica que `NEXT_PUBLIC_APPWRITE_PROJECT_ID` sea correcto
- Asegúrate de que el proyecto existe en tu cuenta

### Error: "Insufficient permissions"
- Verifica que tu API Key tenga todos los permisos necesarios
- Regenera la API Key si es necesario

### Colecciones ya existen
- El script es seguro de ejecutar múltiples veces
- Si una colección ya existe, simplemente la omitirá

## 📱 Próximos Pasos

1. ✅ Configura tu archivo `.env.local`
2. ✅ Ejecuta `pnpm setup-db`
3. 🔄 Verifica las colecciones en [Appwrite Console](https://cloud.appwrite.io/console)
4. 🚀 ¡Tu login y registro ya funcionan!
5. 📦 Próximamente: Gestión de productos y carrito

## 🤝 Soporte

Si tienes problemas:
1. Verifica que todas las variables de entorno estén correctas
2. Revisa que tu API Key tenga permisos suficientes
3. Consulta la consola del navegador para errores específicos

¡Tu tienda Tornado está lista para volar! 🌪️ 