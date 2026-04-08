import { api } from '@/shared/api/instance';
import { useQuery } from '@tanstack/react-query';
import type { ProductsResponse, ProductsSearch } from './schema';

export const useProducts = (params: ProductsSearch = {}) => {
  const { search, ...rest } = params;
  const { data, isFetching } = useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: async () => {
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
    },
  });

  return { data, isFetching };
};
