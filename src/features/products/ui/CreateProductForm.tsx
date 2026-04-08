import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, ErrorMessage } from '@/shared/ui/kit';
import { createProductSchema } from '../model/schema';
import type {
  CreateProductDto,
  CreateProductFormSchema,
} from '../model/schema';

interface ProductFormProps {
  onSubmit: (data: CreateProductDto) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  error?: string;
}

export const CreateProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: '',
      brand: '',
      sku: '',
      price: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit({
          ...data,
          price: Number(data.price),
        });
      })}
    >
      {error && <ErrorMessage message={error} />}
      <Input
        label='Наименование'
        {...register('title')}
        error={errors.title?.message}
      />

      <Input
        label='Вендор'
        {...register('brand')}
        error={errors.brand?.message}
      />

      <Input label='Артикул' {...register('sku')} error={errors.sku?.message} />

      <Input
        label='Цена'
        type='number'
        step='0.01'
        {...register('price')}
        error={errors.price?.message}
      />

      <div className='flex gap-2 mt-4'>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Добавляем...' : 'Добавить'}
        </Button>
        <Button type='button' onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
};
