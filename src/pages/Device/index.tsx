import '../base.css';
import './device.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '../../assets/images';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleRight,
  faCaretLeft,
  faCaretRight,
  faSearch,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';

function Device() {
  return (
    <div className="device__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Thiết bị</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Danh sách thiết bị</div>
        </div>
        <div className="header__wraper">
          <span className="border__icon">
            <FontAwesomeIcon icon={faBell} className="bell__icon" />

            <div className="notify__wrapper">
              <div className="notify__header">Thông báo</div>
              <ul className="notify__list">
                <li className="notify__item">
                  <p className="item__name">Người nhận: Nguyễn Thị Thùy Dung</p>
                  <p className="item__time">Thời gian nhận số: 12h20 ngày 30/11/2021</p>
                </li>
                <li className="notify__item">
                  <p className="item__name">Người nhận: Nguyễn Thị Thùy Dung</p>
                  <p className="item__time">Thời gian nhận số: 12h20 ngày 30/11/2021</p>
                </li>
                <li className="notify__item">
                  <p className="item__name">Người nhận: Nguyễn Thị Thùy Dung</p>
                  <p className="item__time">Thời gian nhận số: 12h20 ngày 30/11/2021</p>
                </li>
                <li className="notify__item">
                  <p className="item__name">Người nhận: Nguyễn Thị Thùy Dung</p>
                  <p className="item__time">Thời gian nhận số: 12h20 ngày 30/11/2021</p>
                </li>
                <li className="notify__item">
                  <p className="item__name">Người nhận: Nguyễn Thị Thùy Dung</p>
                  <p className="item__time">Thời gian nhận số: 12h20 ngày 30/11/2021</p>
                </li>
                <li className="notify__item">
                  <p className="item__name">Người nhận: Nguyễn Thị Thùy Dung</p>
                  <p className="item__time">Thời gian nhận số: 12h20 ngày 30/11/2021</p>
                </li>
                <li className="notify__item">
                  <p className="item__name">Người nhận: Nguyễn Thị Thùy Dung</p>
                  <p className="item__time">Thời gian nhận số: 12h20 ngày 30/11/2021</p>
                </li>
                <li className="notify__item">
                  <p className="item__name">Người nhận: Nguyễn Thị Thùy Dung</p>
                  <p className="item__time">Thời gian nhận số: 12h20 ngày 30/11/2021</p>
                </li>
              </ul>
            </div>
          </span>
          <div className="header__user">
            <img src={images.avatar} alt="avatar" className="user__avatar" />
            <div className="user__welcome">
              <p className="text_hello">Xin chào</p>
              <p className="user__name">Lê Quỳnh Ái Vân</p>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="content__heading">Danh sách thiết bị</div>
        <div className="content__feature">
          <div className="left__group">
            <div className="feature__group">
              <label htmlFor="active-status" className="feature__name">
                Trạng thái hoạt động
              </label>
              <select name="active-status" id="active-status" className="list__box">
                <option value="all">Tất cả</option>
                <option value="active">Hoạt động</option>
                <option value="not-active">Không hoạt động</option>
              </select>
            </div>
            <div className="feature__group">
              <label htmlFor="connect-status" className="feature__name">
                Trạng thái kết nối
              </label>
              <select name="connect-status" id="connect-status" className="list__box">
                <option value="all">Tất cả</option>
                <option value="active">Hoạt động</option>
                <option value="not-active">Không hoạt động</option>
              </select>
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
            Thêm thiết bị
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

export default Device;
