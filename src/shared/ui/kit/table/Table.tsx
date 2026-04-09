import { Body } from './Body';
import { Footer } from './Footer';
import { Header } from './Header';
import type { TableData, TableProps } from './types';

type TableComponent = <T extends TableData>(
  props: TableProps<T>,
) => React.ReactElement;

export const Table: TableComponent = (props) => {
  const handleRowSelect = (rowId: string | number) => {
    const isRowSelected = props.selectedRows?.find((id) => id === rowId);
    const newSelected = isRowSelected
      ? (props.selectedRows || [])?.filter((id) => id !== rowId)
      : [...(props.selectedRows || []), rowId];

    if (props.onRowSelect) {
      props?.onRowSelect(newSelected);
    }
  };

  const handleSelectAll = (selected: boolean) => {
    const newSelecteed = selected ? props.data.map((i) => i.id) : [];

    if (props.onRowSelect) {
      props.onRowSelect(newSelecteed);
    }
  };

  const allSelected = props.selectedRows
    ? props.selectedRows.length === props.data.length
    : false;

  return (
    <div className='flex flex-col h-full bg-white rounded-lg border border-gray-200'>
      <div className='flex-1 overflow-hidden'>
        <div className='h-full overflow-auto'>
          <table className='w-full h-full border-collapse'>
            <colgroup>
              {props.onRowSelect && <col style={{ width: '10px' }} />}
              {props.columns.map((c) => (
                <col style={{ width: c.width ? `${c.width}px` : 'auto' }} />
              ))}
              {props.rowActions && <col style={{ width: 'auto' }} />}
            </colgroup>
            <Header
              columns={props.columns}
              sortBy={props.sortBy}
              sortOrder={props.sortOrder}
              onSort={props.onSort}
              onSelectAll={handleSelectAll}
              allSelected={allSelected}
            />
            <Body
              columns={props.columns}
              data={props.data}
              isLoading={props.isLoading}
              rowActions={props.rowActions}
              onRowSelect={handleRowSelect}
              selectedRows={props.selectedRows}
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
