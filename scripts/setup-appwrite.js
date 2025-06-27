const { Client, Databases, Permission, Role, ID } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'tornado-store')
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

// Configuración de las colecciones
const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID || 'tornado-store-db';

const colecciones = {
  usuarios: {
    id: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID || 'usuarios',
    nombre: 'Usuarios',
    permisos: [
      Permission.read(Role.any()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users())
    ],
    atributos: [
      { clave: 'nombre', tipo: 'string', tamaño: 50, requerido: true },
      { clave: 'apellido', tipo: 'string', tamaño: 50, requerido: true },
      { clave: 'email', tipo: 'email', requerido: true },
      { clave: 'telefono', tipo: 'string', tamaño: 20, requerido: false },
      { clave: 'direccion', tipo: 'string', tamaño: 255, requerido: false },
      { clave: 'ciudad', tipo: 'string', tamaño: 50, requerido: false },
      { clave: 'region', tipo: 'string', tamaño: 50, requerido: false },
      { clave: 'codigoPostal', tipo: 'string', tamaño: 10, requerido: false },
      { clave: 'fechaNacimiento', tipo: 'datetime', requerido: false },
      { clave: 'preferencias', tipo: 'string', tamaño: 1000, requerido: false }, // JSON string
      { clave: 'activo', tipo: 'boolean', requerido: false, defecto: true },
      { clave: 'ultimoLogin', tipo: 'datetime', requerido: false }
    ],
    indices: [
      { clave: 'email', tipo: 'unique', atributos: ['email'] },
      { clave: 'nombre_completo', tipo: 'fulltext', atributos: ['nombre', 'apellido'] }
    ]
  },

  categorias: {
    id: process.env.NEXT_PUBLIC_CATEGORIES_COLLECTION_ID || 'categorias',
    nombre: 'Categorías',
    permisos: [
      Permission.read(Role.any()),
      Permission.create(Role.team('admin')),
      Permission.update(Role.team('admin')),
      Permission.delete(Role.team('admin'))
    ],
    atributos: [
      { clave: 'nombre', tipo: 'string', tamaño: 100, requerido: true },
      { clave: 'slug', tipo: 'string', tamaño: 100, requerido: true },
      { clave: 'descripcion', tipo: 'string', tamaño: 500, requerido: false },
      { clave: 'imagen', tipo: 'url', requerido: false },
      { clave: 'categoriaPadre', tipo: 'string', tamaño: 50, requerido: false }, // ID de categoría padre
      { clave: 'genero', tipo: 'enum', elementos: ['hombre', 'mujer', 'unisex'], requerido: true },
      { clave: 'tipo', tipo: 'enum', elementos: ['ropa', 'zapatillas', 'accesorios'], requerido: true },
      { clave: 'activo', tipo: 'boolean', requerido: false, defecto: true },
      { clave: 'orden', tipo: 'integer', requerido: false, defecto: 0 }
    ],
    indices: [
      { clave: 'slug', tipo: 'unique', atributos: ['slug'] },
      { clave: 'genero_tipo', tipo: 'key', atributos: ['genero', 'tipo'] },
      { clave: 'busqueda_nombre', tipo: 'fulltext', atributos: ['nombre', 'descripcion'] }
    ]
  },

  productos: {
    id: process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID || 'productos',
    nombre: 'Productos',
    permisos: [
      Permission.read(Role.any()),
      Permission.create(Role.team('admin')),
      Permission.update(Role.team('admin')),
      Permission.delete(Role.team('admin'))
    ],
    atributos: [
      { clave: 'nombre', tipo: 'string', tamaño: 200, requerido: true },
      { clave: 'slug', tipo: 'string', tamaño: 200, requerido: true },
      { clave: 'descripcion', tipo: 'string', tamaño: 2000, requerido: true },
      { clave: 'descripcionCorta', tipo: 'string', tamaño: 500, requerido: false },
      { clave: 'sku', tipo: 'string', tamaño: 50, requerido: true },
      { clave: 'precio', tipo: 'float', requerido: true },
      { clave: 'precioOriginal', tipo: 'float', requerido: false },
      { clave: 'stock', tipo: 'integer', requerido: false, defecto: 0 },
      { clave: 'categoria', tipo: 'string', tamaño: 50, requerido: true }, // ID de categoría
      { clave: 'subcategoria', tipo: 'string', tamaño: 50, requerido: false },
      { clave: 'marca', tipo: 'string', tamaño: 100, requerido: true },
      { clave: 'genero', tipo: 'enum', elementos: ['hombre', 'mujer', 'unisex'], requerido: true },
      { clave: 'colores', tipo: 'string', tamaño: 500, requerido: false }, // JSON array
      { clave: 'tallas', tipo: 'string', tamaño: 500, requerido: false }, // JSON array
      { clave: 'imagenes', tipo: 'string', tamaño: 2000, requerido: false }, // JSON array de URLs
      { clave: 'caracteristicas', tipo: 'string', tamaño: 1000, requerido: false }, // JSON array
      { clave: 'especificaciones', tipo: 'string', tamaño: 1000, requerido: false }, // JSON object
      { clave: 'etiquetas', tipo: 'string', tamaño: 500, requerido: false }, // JSON array
      { clave: 'activo', tipo: 'boolean', requerido: false, defecto: true },
      { clave: 'destacado', tipo: 'boolean', requerido: false, defecto: false },
      { clave: 'enOferta', tipo: 'boolean', requerido: false, defecto: false },
      { clave: 'peso', tipo: 'float', requerido: false },
      { clave: 'dimensiones', tipo: 'string', tamaño: 100, requerido: false }, // "largo x ancho x alto"
      { clave: 'puntuacion', tipo: 'float', requerido: false, defecto: 0 },
      { clave: 'numResenas', tipo: 'integer', requerido: false, defecto: 0 },
      { clave: 'numeroVentas', tipo: 'integer', requerido: false, defecto: 0 }
    ],
    indices: [
      { clave: 'slug', tipo: 'unique', atributos: ['slug'] },
      { clave: 'sku', tipo: 'unique', atributos: ['sku'] },
      { clave: 'categoria_genero', tipo: 'key', atributos: ['categoria', 'genero'] },
      { clave: 'rango_precio', tipo: 'key', atributos: ['precio'] },
      { clave: 'destacados', tipo: 'key', atributos: ['destacado'] },
      { clave: 'ofertas', tipo: 'key', atributos: ['enOferta'] },
      { clave: 'busqueda', tipo: 'fulltext', atributos: ['nombre', 'marca', 'descripcion'] }
    ]
  },

  pedidos: {
    id: process.env.NEXT_PUBLIC_ORDERS_COLLECTION_ID || 'pedidos',
    nombre: 'Pedidos',
    permisos: [
      Permission.read(Role.users()),
      Permission.create(Role.users()),
      Permission.update(Role.team('admin')),
      Permission.delete(Role.team('admin'))
    ],
    atributos: [
      { clave: 'usuarioId', tipo: 'string', tamaño: 50, requerido: true },
      { clave: 'numeroPedido', tipo: 'string', tamaño: 20, requerido: true },
      { clave: 'estado', tipo: 'enum', elementos: ['pendiente', 'confirmado', 'procesando', 'enviado', 'entregado', 'cancelado'], requerido: false, defecto: 'pendiente' },
      { clave: 'productos', tipo: 'string', tamaño: 5000, requerido: true }, // JSON array de productos
      { clave: 'subtotal', tipo: 'float', requerido: true },
      { clave: 'impuesto', tipo: 'float', requerido: false, defecto: 0 },
      { clave: 'envio', tipo: 'float', requerido: false, defecto: 0 },
      { clave: 'descuento', tipo: 'float', requerido: false, defecto: 0 },
      { clave: 'total', tipo: 'float', requerido: true },
      { clave: 'moneda', tipo: 'string', tamaño: 3, requerido: false, defecto: 'CLP' },
      { clave: 'metodoPago', tipo: 'enum', elementos: ['tarjeta_credito', 'tarjeta_debito', 'transferencia', 'efectivo', 'webpay'], requerido: true },
      { clave: 'estadoPago', tipo: 'enum', elementos: ['pendiente', 'pagado', 'fallido', 'reembolsado'], requerido: false, defecto: 'pendiente' },
      { clave: 'direccionEnvio', tipo: 'string', tamaño: 1000, requerido: true }, // JSON object
      { clave: 'direccionFacturacion', tipo: 'string', tamaño: 1000, requerido: false }, // JSON object
      { clave: 'notasCliente', tipo: 'string', tamaño: 500, requerido: false },
      { clave: 'notasAdmin', tipo: 'string', tamaño: 500, requerido: false },
      { clave: 'numeroSeguimiento', tipo: 'string', tamaño: 100, requerido: false },
      { clave: 'entregaEstimada', tipo: 'datetime', requerido: false },
      { clave: 'fechaEntrega', tipo: 'datetime', requerido: false }
    ],
    indices: [
      { clave: 'numeroPedido', tipo: 'unique', atributos: ['numeroPedido'] },
      { clave: 'usuarioId', tipo: 'key', atributos: ['usuarioId'] },
      { clave: 'estado', tipo: 'key', atributos: ['estado'] },
      { clave: 'estadoPago', tipo: 'key', atributos: ['estadoPago'] },
      { clave: 'rango_fecha', tipo: 'key', atributos: ['$createdAt'] }
    ]
  },

  carrito: {
    id: process.env.NEXT_PUBLIC_CART_COLLECTION_ID || 'carrito',
    nombre: 'Carrito',
    permisos: [
      Permission.read(Role.users()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users())
    ],
    atributos: [
      { clave: 'usuarioId', tipo: 'string', tamaño: 50, requerido: true },
      { clave: 'productoId', tipo: 'string', tamaño: 50, requerido: true },
      { clave: 'nombreProducto', tipo: 'string', tamaño: 200, requerido: true },
      { clave: 'imagenProducto', tipo: 'url', requerido: false },
      { clave: 'precio', tipo: 'float', requerido: true },
      { clave: 'cantidad', tipo: 'integer', requerido: false, defecto: 1 },
      { clave: 'talla', tipo: 'string', tamaño: 10, requerido: false },
      { clave: 'color', tipo: 'string', tamaño: 50, requerido: false },
      { clave: 'atributos', tipo: 'string', tamaño: 500, requerido: false }, // JSON object para atributos adicionales
      { clave: 'activo', tipo: 'boolean', requerido: false, defecto: true }
    ],
    indices: [
      { clave: 'usuarioId', tipo: 'key', atributos: ['usuarioId'] },
      { clave: 'usuario_producto', tipo: 'key', atributos: ['usuarioId', 'productoId'] }
    ]
  }
};

async function eliminarBaseDatosExistente() {
  try {
    console.log('🗑️ Eliminando base de datos existente...');
    await databases.delete(DATABASE_ID);
    console.log('✅ Base de datos eliminada exitosamente');
  } catch (error) {
    if (error.code === 404) {
      console.log('ℹ️ No existe base de datos previa');
    } else {
      console.error('❌ Error eliminando base de datos:', error.message);
    }
  }
}

async function crearBaseDatos() {
  try {
    console.log('🚀 Creando base de datos...');
    await databases.create(DATABASE_ID, 'Base de Datos Tornado Store');
    console.log('✅ Base de datos creada exitosamente');
  } catch (error) {
    if (error.code === 409) {
      console.log('ℹ️ La base de datos ya existe');
    } else {
      console.error('❌ Error creando base de datos:', error.message);
      throw error;
    }
  }
}

async function crearColeccion(datosColeccion) {
  try {
    console.log(`🔧 Creando colección: ${datosColeccion.nombre}...`);
    
    // Crear la colección
    const coleccion = await databases.createCollection(
      DATABASE_ID,
      datosColeccion.id,
      datosColeccion.nombre,
      datosColeccion.permisos
    );

    // Crear atributos
    for (const attr of datosColeccion.atributos) {
      console.log(`  📝 Creando atributo: ${attr.clave}`);
      
      try {
        switch (attr.tipo) {
          case 'string':
            await databases.createStringAttribute(
              DATABASE_ID,
              datosColeccion.id,
              attr.clave,
              attr.tamaño,
              attr.requerido,
              attr.defecto,
              attr.array
            );
            break;
          case 'email':
            await databases.createEmailAttribute(
              DATABASE_ID,
              datosColeccion.id,
              attr.clave,
              attr.requerido,
              attr.defecto,
              attr.array
            );
            break;
          case 'integer':
            await databases.createIntegerAttribute(
              DATABASE_ID,
              datosColeccion.id,
              attr.clave,
              attr.requerido,
              attr.min,
              attr.max,
              attr.defecto,
              attr.array
            );
            break;
          case 'float':
            await databases.createFloatAttribute(
              DATABASE_ID,
              datosColeccion.id,
              attr.clave,
              attr.requerido,
              attr.min,
              attr.max,
              attr.defecto,
              attr.array
            );
            break;
          case 'boolean':
            await databases.createBooleanAttribute(
              DATABASE_ID,
              datosColeccion.id,
              attr.clave,
              attr.requerido,
              attr.defecto,
              attr.array
            );
            break;
          case 'datetime':
            await databases.createDatetimeAttribute(
              DATABASE_ID,
              datosColeccion.id,
              attr.clave,
              attr.requerido,
              attr.defecto,
              attr.array
            );
            break;
          case 'enum':
            await databases.createEnumAttribute(
              DATABASE_ID,
              datosColeccion.id,
              attr.clave,
              attr.elementos,
              attr.requerido,
              attr.defecto,
              attr.array
            );
            break;
          case 'url':
            await databases.createUrlAttribute(
              DATABASE_ID,
              datosColeccion.id,
              attr.clave,
              attr.requerido,
              attr.defecto,
              attr.array
            );
            break;
        }
        
        // Esperar un poco entre atributos para evitar límites de velocidad
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (attrError) {
        if (attrError.code === 409) {
          console.log(`    ⚠️ El atributo ${attr.clave} ya existe`);
        } else {
          console.error(`    ❌ Error creando atributo ${attr.clave}:`, attrError.message);
        }
      }
    }

    // Crear índices
    if (datosColeccion.indices) {
      for (const indice of datosColeccion.indices) {
        console.log(`  🔍 Creando índice: ${indice.clave}`);
        
        try {
          await databases.createIndex(
            DATABASE_ID,
            datosColeccion.id,
            indice.clave,
            indice.tipo,
            indice.atributos,
            indice.ordenes
          );
          
          // Esperar un poco entre índices
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (indexError) {
          if (indexError.code === 409) {
            console.log(`    ⚠️ El índice ${indice.clave} ya existe`);
          } else {
            console.error(`    ❌ Error creando índice ${indice.clave}:`, indexError.message);
          }
        }
      }
    }

    console.log(`✅ Colección ${datosColeccion.nombre} creada exitosamente`);
    return coleccion;
  } catch (error) {
    if (error.code === 409) {
      console.log(`ℹ️ La colección ${datosColeccion.nombre} ya existe`);
    } else {
      console.error(`❌ Error creando colección ${datosColeccion.nombre}:`, error.message);
      throw error;
    }
  }
}

async function configurarAppwrite() {
  try {
    console.log('🌪️ Configurando Tornado Store - Base de Datos Appwrite');
    console.log('='.repeat(60));
    console.log('');

    if (!process.env.APPWRITE_API_KEY) {
      throw new Error('❌ APPWRITE_API_KEY no está configurado en las variables de entorno');
    }

    // Eliminar base de datos existente y crear nueva
    await eliminarBaseDatosExistente();
    await crearBaseDatos();
    console.log('');

    // Crear todas las colecciones
    for (const [clave, datosColeccion] of Object.entries(colecciones)) {
      await crearColeccion(datosColeccion);
      console.log('');
    }

    console.log('🎉 ¡Configuración completada exitosamente!');
    console.log('='.repeat(60));
    console.log('📋 Resumen de lo creado:');
    console.log(`   📊 Base de datos: ${DATABASE_ID}`);
    console.log(`   📚 Colecciones creadas: ${Object.keys(colecciones).length}`);
    console.log('');
    console.log('📝 Colecciones disponibles:');
    Object.entries(colecciones).forEach(([clave, datos]) => {
      console.log(`   • ${datos.nombre} (${datos.id})`);
    });
    console.log('');
    console.log('🔗 Próximos pasos:');
    console.log('   1. ✏️  Configura tu archivo .env.local con las variables correctas');
    console.log('   2. 🔐 Verifica los permisos en la consola de Appwrite');
    console.log('   3. 🚀 ¡Tu aplicación está lista para usar la base de datos!');
    console.log('');
    console.log('💡 Tip: Puedes ver todas las colecciones en https://cloud.appwrite.io');

  } catch (error) {
    console.error('💥 Error durante la configuración:', error.message);
    console.log('');
    console.log('🔧 Posibles soluciones:');
    console.log('   • Verifica que APPWRITE_API_KEY esté configurado');
    console.log('   • Asegúrate de tener permisos de administrador');
    console.log('   • Revisa que el proyecto ID sea correcto');
    process.exit(1);
  }
}

// Ejecutar la configuración
configurarAppwrite(); 