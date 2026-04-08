import { useMutation } from '@tanstack/react-query';
import type { CreateProductDto } from './schema';
import { api } from '@/shared/api/instance';
import { isAxiosError } from 'axios';

type CreateProductProps = {
  onSuccess: () => void;
};

export function useCreateProduct({ onSuccess }: CreateProductProps) {
  const createProductMutation = useMutation({
    mutationKey: ['product'],
    mutationFn: async (dto: CreateProductDto) => {
      try {
        const res = await api.post('/products/add', dto, { timeout: 5000 });
        return res.data;
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
    onSuccess: () => onSuccess(),
  });

  const errorMessage = createProductMutation.isError
    ? createProductMutation.error.message
    : undefined;

  return {
    createProduct: (dto: CreateProductDto) => createProductMutation.mutate(dto),
    isPending: createProductMutation.isPending,
    errorMessage,
  };
}
