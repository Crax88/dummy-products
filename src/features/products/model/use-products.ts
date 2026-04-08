import { api } from '@/shared/api/instance';
import { useQuery } from '@tanstack/react-query';
import type { ProductsResponse, ProductsSearch } from './schema';
import { isAxiosError } from 'axios';

export const useProducts = (params: ProductsSearch = {}) => {
  const { search, ...rest } = params;
  const { data, isFetching, error, isError } = useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: async () => {
      try {
        if (search) {
          const res = await api.get('/products/search', {
            params: { q: search },
            timeout: 5000,
          });
          return res.data;
        } else {
          const res = await api.get('/products', {
            params: { ...rest },
            timeout: 5000,
          });
          return res.data;
        }
      } catch (error) {
        if (isAxiosError(error)) {
          let message = error.message;
          if (error.response?.data?.message) {
            message = error.response.data?.message;
          } else if (error.response) {
            message = `${error.response.status}: ${error.response.statusText}`;
          }
          throw new Error(message);
        }
        throw new Error('Произошла непредвиденная ошибка');
      }
    },
  });

  const errorMessage = isError ? error?.message : undefined;

  return { data, isFetching, errorMessage };
};
