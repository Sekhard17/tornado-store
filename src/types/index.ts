export interface Product {
  $id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  reservedStock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  $id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  $id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  items: CartItem[];
  total: number;
  status: 'solicitado' | 'confirmado' | 'rechazado' | 'entregado';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderStatus {
  value: 'solicitado' | 'confirmado' | 'rechazado' | 'entregado';
  label: string;
  color: string;
} 