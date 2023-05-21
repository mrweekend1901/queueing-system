import '../../../../pages/base.css';
import '../addtable.css';
import './adddevice.css';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';

function Adddevice() {
  return (
    <div className="adddevice__page add__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Thiết bị</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__fa">Danh sách thiết bị</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Thêm thiết bị</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Quản lý thiết bị</div>
        <div className="content__body">
          <div className="content__label">Thông tin thiết bị</div>
          <form className="form__add">
            <span className="form__add--2-col">
              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Mã thiết bị:
                  <span className="form__label--icon">*</span>
                </label>
                <input className="form__value" type="text" placeholder="Nhập mã thiết bị" />
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Loại thiết bị:
                  <span className="form__label--icon">*</span>
                </label>
                <select className="form__value" placeholder="Chọn loại thiết bị">
                  <option value="kiosk" key="1">
                    Kiosk
                  </option>
                  <option value="display" key="2">
                    Display counter
                  </option>
                </select>
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Tên thiết bị:
                  <span className="form__label--icon">*</span>
                </label>
                <input className="form__value" type="text" placeholder="Nhập tên thiết bị" />
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Tên đăng nhập:
                  <span className="form__label--icon">*</span>
                </label>
                <input className="form__value" type="text" placeholder="Nhập tên đăng nhập" />
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Địa chỉ IP:
                  <span className="form__label--icon">*</span>
                </label>
                <input className="form__value" type="text" placeholder="Nhập địa chỉ IP" />
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Mật khẩu:
                  <span className="form__label--icon">*</span>
                </label>
                <input className="form__value" type="text" placeholder="Nhập mật khẩu" />
              </div>
              <span className="error__massage"></span>
            </span>
            <span className="form__add--1-col">
              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Dịch vụ sử dụng:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value--full-width"
                  type="text"
                  placeholder="Nhập dịch vụ sử dụng"
                />
              </div>
              <span className="error__massage"></span>
            </span>
          </form>
          <div className="content__message">
            <span className="form__label--icon">*</span>
            Là trường thông tin bắt buộc
          </div>
        </div>
        <div className="btn__group">
          <button className="btn form-cancel">Hủy bỏ</button>
          <button className="btn form-submit">Thêm thiết bị</button>
        </div>
      </div>
    </div>
  );
}

export default Adddevice;
