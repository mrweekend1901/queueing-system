import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './table.css';
import { useMemo } from 'react';
import { useTable } from 'react-table';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function Table({ columns, data }: any) {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  const tableInstance = useTable({ columns: memoizedColumns, data: memoizedData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const renderActiveStatus = (cellValue: any) => {
    if (cellValue === 'Hoạt động') {
      return (
        <div className="status__space">
          <FontAwesomeIcon icon={faCircle} color="#34CD26" />
          <span className="text__status">Hoạt động</span>
        </div>
      );
    } else {
      return (
        <div className="status__space">
          <FontAwesomeIcon icon={faCircle} color="red" />
          <span className="text__status">Ngưng hoạt động</span>
        </div>
      );
    }
  };

  const renderConnectStatus = (cellValue: any) => {
    if (cellValue === 'Kết nối') {
      return (
        <div className="status__space">
          <FontAwesomeIcon icon={faCircle} color="#34CD26" />
          <span className="text__status">Kết nối</span>
        </div>
      );
    } else {
      return (
        <div className="status__space">
          <FontAwesomeIcon icon={faCircle} color="red" />
          <span className="text__status">Mất kết nối</span>
        </div>
      );
    }
  };

  return (
    <table className="table" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
            <th></th>
            <th></th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr className="tr__body" {...row.getRowProps()}>
              {row.cells.map(cell => {
                if (cell.column.id === 'activeStatus') {
                  return <td {...cell.getCellProps()}>{renderActiveStatus(cell.value)}</td>;
                } else if (cell.column.id === 'conectStatus') {
                  return <td {...cell.getCellProps()}>{renderConnectStatus(cell.value)}</td>;
                } else {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                }
              })}

              <td>Chi tiết</td>
              <td>Cập nhật</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
