import type { TableColumns, TableData } from './types';

export const Header = <T extends TableData>({
  columns,
  sortBy,
  sortOrder,
  onSort,
  onSelectAll,
  allSelected,
  hasActions,
}: TableColumns<T>) => {
  return (
    <thead className='sticky top-0 z-10 bg-white'>
      <tr className='border-b border-gray-200'>
        {onSelectAll && (
          <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            <input
              type='checkbox'
              checked={Boolean(allSelected)}
              onChange={(e) => onSelectAll(e.target.checked)}
            />
          </th>
        )}
        {columns.map((c) => (
          <th
            className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
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
        {hasActions && (
          <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
        )}
      </tr>
    </thead>
  );
};
