import './home.css';
import '../base.css';
import images from '../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import UserSide from '../../components/UserSide';

function Home() {
  return (
    <div className="home__page">
      <div className="header">
        <div className="header__title">Thông tin cá nhân</div>
        <UserSide />
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
