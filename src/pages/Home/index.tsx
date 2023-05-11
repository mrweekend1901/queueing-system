import './home.css';
import '../base.css';
import images from '../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCamera } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <div className="home__page">
      <div className="header">
        <div className="header__title">Thông tin cá nhân</div>
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
        <div className="content__wrapper">
          <div className="avatar__col">
            <div className="content__avatar">
              <img src={images.avatar2} alt="Avatar" className="avatar-img" />
              <div className="content__avatar-icon">
                <FontAwesomeIcon className="camera__icon" icon={faCamera} />
              </div>
              <p className="content__name">Lê Quỳnh Ái Vân</p>
            </div>
            <p className="content__name"></p>
          </div>
          <div className="input__col">
            <div className="input__form">
              <label className="input__label" htmlFor="fullname">
                Tên người dùng
              </label>
              <input className="input__value" type="text" disabled />
            </div>
            <div className="input__form">
              <label className="input__label" htmlFor="phone">
                Số điện thoại
              </label>
              <input className="input__value" type="text" disabled />
            </div>
            <div className="input__form">
              <label className="input__label" htmlFor="email">
                Email
              </label>
              <input className="input__value" type="text" disabled />
            </div>
          </div>
          <div className="input__col">
            <div className="input__form">
              <label className="input__label" htmlFor="username">
                Tên đăng nhập
              </label>
              <input className="input__value" type="text" disabled />
            </div>
            <div className="input__form">
              <label className="input__label" htmlFor="password">
                Mật khẩu
              </label>
              <input className="input__value" type="text" disabled />
            </div>
            <div className="input__form">
              <label className="input__label" htmlFor="role">
                Vai trò
              </label>
              <input className="input__value" type="text" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
