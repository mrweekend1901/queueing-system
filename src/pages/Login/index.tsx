import '../base.css';
import './login.css';
import formlogo from '../../assets/images/form__logo.png';
import loginimg from '../../assets/images/login__img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const inputType = showPass ? 'text' : 'password';
  return (
    <div className="login-page">
      <div className="form-side">
        <img src={formlogo} alt="form-logo" className="form-logo" />
        <form action="" method="POST" className="login-form" id="login">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Tên đăng nhập *
            </label>
            <div className="login-container">
              <input
                value={user}
                id="username"
                name="username"
                type="text"
                placeholder="Nhập tên đăng nhập..."
                className="form-control"
                onChange={e => setUser(e.target.value)}
              />
            </div>
            <span className="form__message"></span>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mật khẩu *
            </label>
            <div className="password-container">
              <input
                value={pass}
                id="password"
                name="password"
                type={inputType}
                placeholder="Nhập mật khẩu..."
                className="form-control"
                onChange={e => setPass(e.target.value)}
              />
              <FontAwesomeIcon
                className="eyes-icon"
                icon={showPass ? faEyeSlash : faEye}
                onClick={toggleShowPass}
              />
            </div>
            <span className="form__message"></span>
          </div>

          <Link to="/forgetpass" className="forget-password">
            Quên mật khẩu?
          </Link>

          <Link to="/home">
            <button className="btn form-submit">Đăng nhập</button>
          </Link>
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

export default Login;
