import { Button } from '@/shared/ui/kit';
import { useProducts } from './model/use-products';
import { ProductSearch } from './ui/ProductSearch';
import { ProductsTable } from './ui/ProductsTable';
import type { Product } from './model/schema';
import { useFilters } from './model/use-filters';
import { useDebouncedValue } from '@/shared/lib/hooks.';
import { ArrowsIcon, PlusIcon } from '@/shared/ui/icons';

const ITEMS_PER_PAGE = 10;

const ProductsPage = () => {
  const { filters, updateFiltes } = useFilters();

  const { data, isFetching } = useProducts({
    sortBy: filters.sortBy as keyof Product,
    search: useDebouncedValue(filters.search),
    order: filters.order as 'asc' | 'desc',
    limit: ITEMS_PER_PAGE,
    skip: (Number(filters.page) - 1) * ITEMS_PER_PAGE,
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
          <Button className='text-xs'>
            <div className='flex gap-1'>
              <PlusIcon className='h-4 w-4 text-gray-400' />
              Добавить
            </div>
          </Button>
        </div>
      </div>
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
        />
      </div>
    </div>
  );
};

export const Component = ProductsPage;
