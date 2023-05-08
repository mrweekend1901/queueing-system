import '../base.css';
import './forget.css';
import formlogo from '../../assets/images/form__logo.png';
import loginimg from '../../assets/images/login__img.png';
import { Link } from 'react-router-dom';

function Forgetpass() {
  return (
    <div className="login-page">
      <div className="form-side">
        <img src={formlogo} alt="form-logo" className="form-logo" />
        <form action="" method="POST" className="forget-form" id="forget-form">
          <div className="form-group">
            <label className="heading-forget-pass">Đặt lại mật khẩu</label>
            <label htmlFor="email" className="form-label">
              Vui lòng nhập email để đặt lại mật khẩu cho bạn *
            </label>
            <div className="login-container">
              <input id="email" name="email" type="text" placeholder="|" className="form-control" />
            </div>
            <span className="form__message"></span>
          </div>

          <div className="btn-group">
            <Link to="/">
              <button className="btn form-cancel">Hủy</button>
            </Link>
            <Link to="/newpass">
              <button className="btn form-continue">Tiếp tục</button>
            </Link>
          </div>
        </form>
      </div>
      <div className="picture-side">
        <img src={loginimg} alt="login-img" className="login-img" />
        <span className="app-name">
          <p className="text1">Hệ thống</p>
          <p className="text2">QUẢN LÝ XẾP HÀNG</p>
        </span>
      </div>
    </div>
  );
}

export default Forgetpass;
