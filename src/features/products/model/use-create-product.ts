import { useMutation } from '@tanstack/react-query';
import type { CreateProductDto } from './schema';
import { api } from '@/shared/api/instance';

type CreateProductProps = {
  onSuccess: () => void;
};

export function useCreateProduct({ onSuccess }: CreateProductProps) {
  const createProductMutation = useMutation({
    mutationKey: ['product'],
    mutationFn: async (dto: CreateProductDto) => {
      const res = await api.post('/products/add', dto);
      return res.data;
    },
    onSuccess: () => onSuccess(),
  });

  return {
    createProduct: (dto: CreateProductDto) => createProductMutation.mutate(dto),
    isPending: createProductMutation.isPending,
    error: createProductMutation.error?.message,
  };
}
