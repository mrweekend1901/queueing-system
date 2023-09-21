import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './table.css';
import { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

function Table({ columns, data }: any) {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  const navigate = useNavigate();
  const location = useLocation();

  // // Lấy dữ liệu row
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (row: any) => {
    setSelectedRow(row);

    if (location.pathname === '/queueing-system/device') {
      navigate('/queueing-system/device/detaildevice', { state: row });
    } else if (location.pathname === '/queueing-system/service') {
      navigate('/queueing-system/service/detailservice', { state: row });
    } else if (location.pathname === '/queueing-system/number') {
      navigate('/queueing-system/number/detailnumber', { state: row });
    }
  };

  const handleRowUpdateClick = (row: any) => {
    setSelectedRow(row);

    if (location.pathname === '/queueing-system/device') {
      navigate('/queueing-system/device/updatedevice', { state: row });
    } else if (location.pathname === '/queueing-system/service') {
      navigate('/queueing-system/service/updateservice', { state: row });
    } else if (location.pathname === '/queueing-system/number') {
      navigate('/queueing-system/number/detailnumber', { state: row });
    } else if (location.pathname === '/queueing-system/setting/settingrole') {
      navigate('/queueing-system/setting/settingrole/updaterole', { state: row });
    } else if (location.pathname === '/queueing-system/setting/settinguser') {
      navigate('/queueing-system/setting/settinguser/updateuser', { state: row });
    }
  };

  const shouldShowUpdateColumn =
    location.pathname !== '/queueing-system/number' &&
    location.pathname !== '/queueing-system/service/detailservice' &&
    location.pathname !== '/queueing-system/setting/history'; // Kiểm tra path hiện tại
  const shouldShowDetailColumn =
    location.pathname !== '/queueing-system/service/detailservice' &&
    location.pathname !== '/queueing-system/setting/settingrole' &&
    location.pathname !== '/queueing-system/setting/settinguser' &&
    location.pathname !== '/queueing-system/setting/history'; // Kiểm tra path hiện tại

  const tableInstance = useTable({
    columns: memoizedColumns,
    data: memoizedData,
    // .filter((row: any) => !shouldShowUpdateColumn || row.path !== '/number'),
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  // hiển thị icon trạng thái hoạt động
  const renderActiveStatus = (cellValue: any) => {
    if (cellValue === true) {
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

  // hiển thị icon trạng thái kết nối
  const renderConnectStatus = (cellValue: any) => {
    if (cellValue === true) {
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

  const renderStatusNum = (cellValue: any) => {
    if (cellValue === 'Đã hoàn thành') {
      return (
        <div className="status__space">
          <FontAwesomeIcon icon={faCircle} color="#34CD26" />
          <span className="text__status">Đã hoàn thành</span>
        </div>
      );
    } else if (cellValue === 'Đang thực hiện') {
      return (
        <div className="status__space">
          <FontAwesomeIcon icon={faCircle} color="#5490EB" />
          <span className="text__status">Đang thực hiện</span>
        </div>
      );
    } else {
      return (
        <div className="status__space">
          <FontAwesomeIcon icon={faCircle} color="#6C7585" />
          <span className="text__status">Vắng</span>
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
            {shouldShowDetailColumn && <th></th>}
            {shouldShowUpdateColumn && <th></th>}
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
                } else if (cell.column.id === 'connectStatus') {
                  return <td {...cell.getCellProps()}>{renderConnectStatus(cell.value)}</td>;
                } else if (cell.column.id === 'status') {
                  return <td {...cell.getCellProps()}>{renderStatus(cell.value)}</td>;
                } else if (cell.column.id === 'statusNum') {
                  return <td {...cell.getCellProps()}>{renderStatusNum(cell.value)}</td>;
                } else {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                }
              })}
              {shouldShowDetailColumn && (
                <td onClick={() => handleRowClick(row.original)} className="td__click">
                  Chi tiết
                </td>
              )}
              {shouldShowUpdateColumn && (
                <td onClick={() => handleRowUpdateClick(row.original)} className="td__click">
                  Cập nhật
                </td>
              )}
              {/* <td className="td__click">Cập nhật</td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
