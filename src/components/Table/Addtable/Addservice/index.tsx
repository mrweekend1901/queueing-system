import '../../../../pages/base.css';
import '../addtable.css';
import './addservice.css';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';

function Addservice() {
  return (
    <div className="addservice__page add__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Dịch vụ</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__fa">Danh sách dịch vụ</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Thêm dịch vụ</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Quản lý dịch vụ</div>
        <div className="content__body">
          <form className="form__add">
            <div className="content__label">Thông tin dịch vụ</div>
            <span className="content__group">
              <span className="form__add--2-col">
                <div className="form__group">
                  <label htmlFor="" className="form__label">
                    Mã dịch vụ:
                    <span className="form__label--icon">*</span>
                  </label>
                  <input className="form__value" type="text" placeholder="Nhập mã thiết bị" />
                </div>
                <span className="error__massage"></span>
                <div className="form__group">
                  <label htmlFor="" className="form__label">
                    Tên dịch vụ:
                    <span className="form__label--icon">*</span>
                  </label>
                  <input className="form__value" type="text" placeholder="Nhập mã thiết bị" />
                </div>
                <span className="error__massage"></span>
              </span>
              <span className="form__add--2-col">
                <div className="form__group">
                  <label htmlFor="" className="form__label">
                    Mô tả:
                    <span className="form__label--icon">*</span>
                  </label>
                  <input
                    className="form__value form__value-service"
                    type="text"
                    placeholder="Nhập mã thiết bị"
                  />
                </div>
                <span className="error__massage"></span>
              </span>
            </span>
            <div className="content__label">Quy tắc cấp số</div>
            <span className="content__group">
              <span className="form__add--1-col">
                <div className="form__group">
                  <input className="checkbox__value" type="checkbox" />
                  <span className="checkbox__text">Tăng tự động từ</span>
                  <input className="input__number" type="text" />
                  <span className="checkbox__text">đến</span>
                  <input className="input__number" type="text" />
                </div>
                <div className="form__group">
                  <input className="checkbox__value" type="checkbox" />
                  <span className="checkbox__text">Prefix</span>
                  <input className="input__number" type="text" />
                </div>
                <div className="form__group">
                  <input className="checkbox__value" type="checkbox" />
                  <span className="checkbox__text">Surfix</span>
                  <input className="input__number" type="text" />
                </div>
                <div className="form__group">
                  <input className="checkbox__value" type="checkbox" />
                  <span className="checkbox__text">Reset mỗi ngày</span>
                </div>
              </span>
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

export default Addservice;
