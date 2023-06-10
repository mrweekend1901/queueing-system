import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';
import { useTable } from 'react-table';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './tablewithfilter.css';

function TableWithFilter({ columns, data }: any) {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  const tableInstance = useTable({
    columns: memoizedColumns,
    data: memoizedData,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  // hiển thị icon trạng thái
  const renderStatus = (cellValue: any) => {
    if (cellValue === 'Đang chờ') {
      return (
        <div className="status__space">
          <FontAwesomeIcon icon={faCircle} color="#4277FF" />
          <span className="text__status">Đang chờ</span>
        </div>
      );
    } else if (cellValue === 'Đã sử dụng') {
      return (
        <div className="status__space">
          <FontAwesomeIcon icon={faCircle} color="#7E7D88" />
          <span className="text__status">Đã sử dụng</span>
        </div>
      );
    } else {
      return (
        <div className="status__space">
          <FontAwesomeIcon icon={faCircle} color="#E73F3F" />
          <span className="text__status">Bỏ qua</span>
        </div>
      );
    }
  };

  return (
    <table className="table table-with-filter" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr className="table-head-row" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                <span className="table-head">
                  {column.render('Header')} {column.render('icon')}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr className="tr__body" {...row.getRowProps()}>
              {row.cells.map(cell => {
                if (cell.column.id === 'status') {
                  return <td {...cell.getCellProps()}>{renderStatus(cell.value)}</td>;
                } else {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableWithFilter;
