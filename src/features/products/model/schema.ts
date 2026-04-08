import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  brand: z.string().min(1, 'Обязательное поле'),
  sku: z.string().min(1, 'Обязательное поле'),
  price: z.string().regex(/^\d+$/, 'Цена должна быть числом'),
});

export type CreateProductFormSchema = z.infer<typeof createProductSchema>;

export type CreateProductDto = {
  title: string;
  brand: string;
  sku: string;
  price: number;
};

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
