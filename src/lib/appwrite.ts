import { Client, Databases, Storage, Account } from 'appwrite';

const client = new Client();

// Configuración de Appwrite
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'tornado-store');

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

// IDs de la base de datos y colecciones
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID || 'tornado-store-db';
export const COLLECTIONS = {
  USUARIOS: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID || 'usuarios',
  PRODUCTOS: process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID || 'productos',
  PEDIDOS: process.env.NEXT_PUBLIC_ORDERS_COLLECTION_ID || 'pedidos',
  CATEGORIAS: process.env.NEXT_PUBLIC_CATEGORIES_COLLECTION_ID || 'categorias',
  CARRITO: process.env.NEXT_PUBLIC_CART_COLLECTION_ID || 'carrito'
};

export default client; 