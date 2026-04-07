import type { TableProps } from './types';

export const Footer = <T extends Record<string, any>>({
  onPageChange,
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
}: Pick<
  TableProps<T>,
  'onPageChange' | 'currentPage' | 'totalPages' | 'itemsPerPage' | 'totalItems'
>) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className='flex items-center justify-between'>
      <div className='text-sm text-gray-700'>
        Показано {startItem} - {endItem} из {totalItems}
      </div>
      <div className='flex items-center gap-2'>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors'
        >
          <span className='w-4 h-4'>{'<'}</span>
        </button>
        <div className='flex gap-1'>
          {(() => {
            const pages = [];
            const maxVisible = 5;

            if (totalPages <= maxVisible) {
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) pages.push(i);
              } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++)
                  pages.push(i);
              } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++)
                  pages.push(i);
              }
            }

            return pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-[32px] h-8 px-2 rounded text-sm transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ));
          })()}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors'
        >
          <span>{'>'}</span>
        </button>
      </div>
    </div>
  );
};
