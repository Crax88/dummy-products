import { Table } from '@/shared/ui/kit';
import type { TableColumn } from '@/shared/ui/kit';
import type { Product } from '../model/schema';

interface ProductTableProps {
  products: Product[];
  sortBy?: keyof Product;
  sortOrder?: 'asc' | 'desc';
  onSort: (by: keyof Product) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const columns: TableColumn<Product>[] = [
  {
    key: 'title',
    label: 'Наименование',
    render(value, product) {
      return (
        <div className='flex gap-1'>
          <img
            src={product.thumbnail}
            alt={product.title}
            className='w-12 h-12 object-cover rounded-lg'
          />
          <div>
            <div className='font-medium text-gray-900'>{value}</div>
            <div className='text-sm text-gray-500 line-clamp-2'>
              {product.category}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    key: 'brand',
    label: 'Вендор',
  },
  {
    key: 'sku',
    label: 'Артикул',
  },
  {
    key: 'rating',
    label: 'Оценка',
    render(value) {
      return (
        <p>
          <span className={Number(value) <= 3 ? 'text-red-500' : ''}>
            {value}
          </span>{' '}
          / 5
        </p>
      );
    },
  },
  {
    key: 'price',
    label: 'Цена',
  },
];

export const ProductsTable: React.FC<ProductTableProps> = ({
  products,
  currentPage = 1,
  ...rest
}) => {
  return (
    <Table
      data={products}
      columns={columns}
      currentPage={currentPage}
      {...rest}
    />
  );
};
