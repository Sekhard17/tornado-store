import { Client, Databases, Storage, Account } from 'appwrite';

const client = new Client();

// Configuración de Appwrite - reemplaza con tus credenciales
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Tu endpoint de Appwrite
  .setProject('tornado-store'); // Tu project ID

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

// IDs de la base de datos y colecciones
export const DATABASE_ID = 'tornado-store-db';
export const COLLECTIONS = {
  PRODUCTS: 'products',
  ORDERS: 'orders',
  CATEGORIES: 'categories'
};

export default client; 