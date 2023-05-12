import '../base.css';
import './number.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faCaretLeft,
  faCaretRight,
  faSearch,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import UserSide from '../../components/UserSide';

function Number() {
  return (
    <div className="device__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Cấp số</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Danh sách cấp số</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Quản lý cấp số</div>
        <div className="content__feature">
          <div className="left__group">
            <div className="feature__group">
              <label htmlFor="active-status" className="feature__name">
                Tên dịch vụ
              </label>
              <select name="active-status" id="active-status" className="list__box">
                <option value="all">Tất cả</option>
                <option value="active">Khám sản - Phụ khoa</option>
                <option value="not-active">Khám răng hàm mặt</option>
                <option value="not-active">Khám tai mũi họng</option>
              </select>
            </div>
            <div className="feature__group">
              <label htmlFor="active-status" className="feature__name">
                Tình trạng
              </label>
              <select name="active-status" id="active-status" className="list__box">
                <option value="all">Tất cả</option>
                <option value="active">Đang chờ</option>
                <option value="not-active">Đã sử dụng</option>
                <option value="not-active">Bỏ qua</option>
              </select>
            </div>
            <div className="feature__group">
              <label htmlFor="active-status" className="feature__name">
                Nguồn cấp
              </label>
              <select name="active-status" id="active-status" className="list__box">
                <option value="all">Tất cả</option>
                <option value="active">Kiosk</option>
                <option value="not-active">Hệ thống</option>
              </select>
            </div>
            <div className="feature__group">
              <label htmlFor="" className="feature__name">
                Chọn thời gian
              </label>
              <input type="date" className="date__from" />
              <FontAwesomeIcon icon={faCaretRight} className="date__icon" />
              <input type="date" className="date__to" />
            </div>
          </div>
          <div className="feature__group">
            <label htmlFor="search-input" className="feature__name">
              Từ khóa
            </label>
            <span className="input__container">
              <input type="text" className="search-input" placeholder="Nhập từ khóa..." />
              <FontAwesomeIcon className="search-input-icon" icon={faSearch} />
            </span>
          </div>
        </div>

        <div className="content__board">
          <div className="content__table"></div>
          <button className="add__table">
            <FontAwesomeIcon icon={faSquarePlus} className="add__table-icon" />
            Thêm dịch vụ
          </button>
        </div>
      </div>

      <div className="paging">
        <FontAwesomeIcon icon={faCaretLeft} className="paging__icon" />
        <ul className="paging__list">
          <li className="paging__item paging__active">1</li>
          <li className="paging__item">2</li>
          <li className="paging__item">3</li>
          <li className="paging__item">4</li>
          <li className="paging__item">5</li>
          <li className="paging__item">...</li>
          <li className="paging__item">10</li>
        </ul>
        <FontAwesomeIcon icon={faCaretRight} className="paging__icon" />
      </div>
    </div>
  );
}

export default Number;
