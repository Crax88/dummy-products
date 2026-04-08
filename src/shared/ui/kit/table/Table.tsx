import { Body } from './Body';
import { Footer } from './Footer';
import { Header } from './Header';
import type { TableData, TableProps } from './types';

type TableComponent = <T extends TableData>(
  props: TableProps<T>,
) => React.ReactElement;

export const Table: TableComponent = (props) => {
  return (
    <div className='flex flex-col h-full bg-white rounded-lg border border-gray-200'>
      <div className='flex-1 overflow-hidden'>
        <div className='h-full overflow-auto'>
          <table className='w-full h-full border-collapse'>
            <Header
              columns={props.columns}
              sortBy={props.sortBy}
              sortOrder={props.sortOrder}
              onSort={props.onSort}
            />
            <Body
              columns={props.columns}
              data={props.data}
              isLoading={props.isLoading}
            />
          </table>
        </div>
      </div>
      {Boolean(props.totalItems) && (
        <div className='flex-shrink-0 border-t border-gray-200 px-4 py-3 bg-gray-50 rounded-b-lg"'>
          <Footer
            currentPage={props.currentPage}
            itemsPerPage={props.itemsPerPage}
            totalItems={props.totalItems}
            totalPages={props.totalPages}
            onPageChange={props.onPageChange}
          />
        </div>
      )}
    </div>
  );
};
