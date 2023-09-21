import { useLocation } from 'react-router-dom';
import UserSide from '../../../UserSide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircle, faPen, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

import '../../Addtable/addtable.css';
import '../DetailRow.css';
import { formatTimestamp } from '../../../../pages/Number'; // Import the formatTimestamp function
import { Link } from 'react-router-dom';

function DetailNumber() {
  const location = useLocation();
  const row = location.state;

  // Hàm để trả về màu sắc tương ứng với trạng thái
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đang chờ':
        return '#4277FF';
      case 'Đã sử dụng':
        return '#7E7D88';
      case 'Bỏ qua':
        return '#E73F3F';
      default:
        return '';
    }
  };

  // Lấy màu sắc từ trạng thái
  const statusColor = getStatusColor(row.status);

  return (
    <div className="detail__page add__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Cấp số</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__fa">Danh sách cấp số</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Chi tiết</div>
        </div>
        <UserSide />
      </div>
      <div className="content">
        <div className="content__heading">Quản lý cấp số</div>
        <span className="content__wrapper-detail">
          <div className="content__body">
            <div className="content__label">Thông tin cấp số</div>
            <div className="content__detail">
              <span className="full-col">
                <span className="col-2">
                  <div className="detail__group">
                    <div className="detail__label">Họ tên:</div>
                    <div className="detail__value">{row.customerName}</div>
                  </div>
                  <div className="detail__group">
                    <div className="detail__label">Tên dịch vụ:</div>
                    <div className="detail__value">{row.serviceName}</div>
                  </div>
                  <div className="detail__group">
                    <div className="detail__label">Số thứ tự:</div>
                    <div className="detail__value">{row.numberId}</div>
                  </div>
                  <div className="detail__group">
                    <div className="detail__label">Thời gian cấp:</div>
                    <div className="detail__value">{formatTimestamp(row.timeStart)}</div>
                  </div>
                  <div className="detail__group">
                    <div className="detail__label">Hạn sử dụng:</div>
                    <div className="detail__value">{formatTimestamp(row.timeEnd)}</div>
                  </div>
                </span>
                <span className="col-2">
                  <div className="detail__group">
                    <div className="detail__label">Nguồn cấp:</div>
                    <div className="detail__value">{row.supply}</div>
                  </div>
                  <div className="detail__group">
                    <div className="detail__label">Trạng thái:</div>
                    <div className="detail__value">
                      <FontAwesomeIcon
                        className="value__icon"
                        icon={faCircle}
                        color={statusColor}
                      />
                      {row.status}
                    </div>
                  </div>
                  <div className="detail__group">
                    <div className="detail__label">Số điện thoại:</div>
                    <div className="detail__value">{row.telephone}</div>
                  </div>
                  <div className="detail__group">
                    <div className="detail__label">Địa chỉ Email:</div>
                    <div className="detail__value">{row.emailUser}</div>
                  </div>
                </span>
              </span>
            </div>
          </div>
          <Link className="btn__link" to="/queueing-system/number">
            <button className="btn__back">
              <FontAwesomeIcon className="btn-back__icon" icon={faRotateLeft} />
              Quay lại
            </button>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default DetailNumber;
