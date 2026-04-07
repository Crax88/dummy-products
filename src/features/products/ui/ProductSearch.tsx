import React from 'react';
import { Input } from '@/shared/ui/kit';
import { SearchIcon } from '@/shared/ui/icons/SearchIcon';

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <Input
      startSlot={
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <SearchIcon />
        </div>
      }
      type='text'
      placeholder='Найти'
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className='w-full mb-0 md:w-[80%] bg-gray-300 rounded-lg'
    />
  );
};
