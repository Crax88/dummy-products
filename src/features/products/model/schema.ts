export type Product = {
  id: number;
  title: string;
  category: string;
  brand: string;
  sku: string;
  rating: number;
  price: number;
  thumbnail: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductsSearch = {
  search?: string;
  limit?: number;
  skip?: number;
  sortBy?: keyof Product;
  order?: 'asc' | 'desc';
};
