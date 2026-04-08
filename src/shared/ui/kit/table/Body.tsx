import type { TableProps, TableData } from './types';

export const Body = <T extends TableData>({
  columns,
  data,
  isLoading,
}: Pick<TableProps<T>, 'columns' | 'data' | 'isLoading'>) => {
  return (
    <tbody className='bg-white divide-y divide-gray-200'>
      {!isLoading && data.length === 0 && (
        <tr>
          <td colSpan={6} className='px-4 py-8 text-center text-gray-500'>
            Данные не найдены
          </td>
        </tr>
      )}
      {data.map((item) => (
        <tr key={item.id} className='hover:bg-gray-50 transition-colors'>
          {columns.map((c) => (
            <td className='px-4 py-3 whitespace-nowrap'>
              {c.render ? c.render(item[c.key], item) : item[c.key]}
            </td>
          ))}
        </tr>
      ))}
      {isLoading && (
        <tr>
          <td colSpan={columns.length} className='px-4 py-8 text-center'>
            <div className='flex justify-center items-center'>
              <div className='inline-block animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent'></div>
              <span className='ml-2 text-gray-500'>Загрузка...</span>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
};
