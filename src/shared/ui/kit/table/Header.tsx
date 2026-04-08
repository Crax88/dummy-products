import type { TableColumns, TableData } from './types';

export const Header = <T extends TableData>({
  columns,
  sortBy,
  sortOrder,
  onSort,
}: TableColumns<T>) => {
  return (
    <thead className='sticky top-0 z-10 bg-white'>
      <tr className='border-b border-gray-200'>
        {columns.map((c) => (
          <th
            className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20'
            onClick={() => onSort && onSort(c.key)}
          >
            {c.label}
            {sortBy === c.key && (
              <span className='text-blue-600'>
                {sortOrder === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};
