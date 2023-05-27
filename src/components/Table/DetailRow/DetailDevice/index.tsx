import { useLocation } from 'react-router-dom';
import UserSide from '../../../UserSide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faPen } from '@fortawesome/free-solid-svg-icons';

import '../../Addtable/addtable.css';
import '../DetailRow.css';

function DetailDevice() {
  const location = useLocation();
  const row = location.state;

  return (
    <div className="detail__page add__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Thiết bị</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__fa">Danh sách thiết bị</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Chi tiết thiết bị</div>
        </div>
        <UserSide />
      </div>
      <div className="content">
        <div className="content__heading">Quản lý thiết bị</div>
        <span className="content__wrapper-detail">
          <div className="content__body">
            <div className="content__label">Thông tin thiết bị</div>
            <div className="content__detail">
              <span className="full-col">
                <span className="col-2">
                  <div className="detail__group">
                    <div className="detail__label">Mã thiết bị:</div>
                    <div className="detail__value">{row.deviceId}</div>
                  </div>
                  <div className="detail__group">
                    <div className="detail__label">Tên thiết bị:</div>
                    <div className="detail__value">{row.deviceName}</div>
                  </div>
                  <div className="detail__group">
                    <div className="detail__label">Địa chỉ IP:</div>
                    <div className="detail__value">{row.ipAddress}</div>
                  </div>
                </span>
                <span className="col-2">
                  <div className="detail__group">
                    <div className="detail__label">Loại thiết bị:</div>
                    <div className="detail__value">{row.deviceType}</div>
                  </div>
                  <div className="detail__group">
                    <div className="detail__label">Tên đăng nhập:</div>
                    <div className="detail__value">{row.userName}</div>
                  </div>
                  <div className="detail__group">
                    <div className="detail__label">Mật khẩu:</div>
                    <div className="detail__value">{row.passWord}</div>
                  </div>
                </span>
              </span>
              <span className="full-col">
                <div className="detail__group wrap">
                  <div className="detail__label">Dịch vụ sử dụng:</div>
                  <div className="detail__value">{row.serviceUse}</div>
                </div>
              </span>
            </div>
          </div>
          <button className="btn__update">
            <FontAwesomeIcon className="btn-update__icon" icon={faPen} />
            Cập nhật thiết bị
          </button>
        </span>
      </div>
    </div>

    // <div>
    //   <h2>Chi tiết</h2>
    //   <p>Mã thiết bị: {row.deviceId}</p>
    //   <p>Tên thiết bị: {row.deviceName}</p>
    //   <p>Địa chỉ IP: {row.ipAddress}</p>
    //   <p>Trạng thái hoạt động: {row.activeStatus}</p>
    //   <p>Trạng thái kết nối: {row.conectStatus}</p>
    //   <p>Dịch vụ sử dụng: {row.serviceUse}</p>
    //   <p>Dịch vụ sử dụng: {row.userName}</p>
    //   <p>Dịch vụ sử dụng: {row.passWord}</p>
    // </div>
  );
}

export default DetailDevice;
