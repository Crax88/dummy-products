import { useDebouncedValue } from '@/shared/lib/hooks.';
import { ArrowsIcon, PlusIcon } from '@/shared/ui/icons';
import { Button, ErrorMessage } from '@/shared/ui/kit';
import { Modal } from '@/shared/ui/kit/Modal';
import { useState } from 'react';
import type { CreateProductDto, Product } from './model/schema';
import { useCreateProduct } from './model/use-create-product';
import { useFilters } from './model/use-filters';
import { useProducts } from './model/use-products';
import { CreateProductForm } from './ui/CreateProductForm';
import { ProductSearch } from './ui/ProductSearch';
import { ProductsTable } from './ui/ProductsTable';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 10;

const ProductsPage = () => {
  const { filters, updateFiltes } = useFilters();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product['id'][]>([]);

  const { data, isFetching, errorMessage } = useProducts({
    sortBy: filters.sortBy as keyof Product,
    search: useDebouncedValue(filters.search),
    order: filters.order as 'asc' | 'desc',
    limit: ITEMS_PER_PAGE,
    skip: (Number(filters.page) - 1) * ITEMS_PER_PAGE,
  });

  const createProduct = useCreateProduct({
    onSuccess: () => {
      setCreateModalOpen(false);
      toast.success('Товар успешно добавлен');
    },
  });

  const handleRefresh = () => {
    updateFiltes({ order: '', page: '1', search: '', sortBy: '' });
  };

  const handlePageChange = (page: number) => {
    updateFiltes({ page: String(page) });
  };

  const handleSortFieldChange = (field: keyof Product) => {
    const newOrder =
      filters.sortBy === field && filters.order === 'asc' ? 'desc' : 'asc';

    updateFiltes({ sortBy: field, order: newOrder });
  };

  return (
    <div className='h-screen w-screen flex flex-col bg-gray-300'>
      <div className='flex-shrink-0 bg-white border-b border-gray-200 shadow-sm flex items-center gap-10 p-3 mb-6'>
        <h1 className='text-2xl font-bold'>Товары</h1>
        <ProductSearch
          searchTerm={filters.search}
          onSearchChange={(searchTerm) => updateFiltes({ search: searchTerm })}
        />
      </div>
      <div className='flex-shrink-0 bg-white border-b border-gray-200 shadow-sm flex items-center gap-10 p-3 justify-between'>
        Все позиции
        <div className='flex gap-2'>
          <Button
            className='text-xs bg-white border-1 border-gray-500'
            onClick={handleRefresh}
          >
            <ArrowsIcon className='h-4 w-4 text-gray-400' />
          </Button>
          <Button className='text-xs' onClick={() => setCreateModalOpen(true)}>
            <div className='flex gap-1'>
              <PlusIcon className='h-4 w-4 text-gray-400' />
              Добавить
            </div>
          </Button>
        </div>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <div className='flex-1 overflow-hidden'>
        <ProductsTable
          products={data?.products || []}
          sortBy={filters.sortBy as keyof Product}
          sortOrder={filters.order as 'asc' | 'desc'}
          isLoading={isFetching}
          currentPage={Number(filters.page)}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={data?.total || 0}
          totalPages={Math.ceil((data?.total || 0) / ITEMS_PER_PAGE)}
          onPageChange={handlePageChange}
          onSort={handleSortFieldChange}
          selectedProducts={selectedProducts}
          onSelect={setSelectedProducts}
        />
      </div>
      <Modal
        title='Создание товара'
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      >
        <CreateProductForm
          onSubmit={(dto: CreateProductDto) => createProduct.createProduct(dto)}
          onCancel={() => setCreateModalOpen(false)}
          isSubmitting={createProduct.isPending}
          error={createProduct.errorMessage}
        />
      </Modal>
    </div>
  );
};

export const Component = ProductsPage;
