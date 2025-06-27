export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  discount: number;
  isFeatured?: boolean;
  description?: string;
}

export type Category = "Todos" | "Zapatillas" | "Ropa" | "Accesorios";

export interface ProductCardProps {
  product: Product;
  favorites: number[];
  onToggleFavorite: (productId: number) => void;
  variant?: 'default' | 'compact' | 'grid';
}

export interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
} 