import { useLocation } from 'react-router-dom';

function DetailRow() {
  const location = useLocation();
  const row = location.state;
  console.log(location);
  return (
    <div>
      <h2>Chi tiết</h2>
      <p>Mã thiết bị: {row.deviceId}</p>
      <p>Tên thiết bị: {row.deviceName}</p>
      <p>Địa chỉ IP: {row.ipAddress}</p>
      <p>Trạng thái hoạt động: {row.activeStatus}</p>
      <p>Trạng thái kết nối: {row.conectStatus}</p>
      <p>Dịch vụ sử dụng: {row.serviceUse}</p>
    </div>
  );
}

export default DetailRow;
