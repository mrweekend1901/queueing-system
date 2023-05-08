import '../base.css';
import './newpass.css';
import formlogo from '../../assets/images/form__logo.png';
import loginimg from '../../assets/images/login__img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Newpass() {
  const [newPass, setNewPass] = useState('');
  const [reNewPass, setReNewPass] = useState('');
  const [showPass, setShowPass] = useState(false);

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const inputType = showPass ? 'text' : 'password';
  return (
    <div className="login-page">
      <div className="form-side">
        <img src={formlogo} alt="form-logo" className="form-logo" />
        <form action="" method="POST" className="newpass-form" id="newpass-form">
          <div className="form-group">
            <label htmlFor="newpass" className="form-label">
              Mật khẩu *
            </label>
            <div className="newpass-container">
              <input
                value={newPass}
                id="newpass"
                name="newpass"
                type={inputType}
                placeholder="Nhập mật khẩu mới..."
                className="form-control"
                onChange={e => setNewPass(e.target.value)}
              />
              <FontAwesomeIcon
                className="eyes-icon"
                icon={showPass ? faEyeSlash : faEye}
                onClick={toggleShowPass}
              />
            </div>
            <span className="form__message"></span>
          </div>

          <div className="form-group">
            <label htmlFor="re-newpass" className="form-label">
              Nhập lại mật khẩu *
            </label>
            <div className="re-newpass-container">
              <input
                value={reNewPass}
                id="re-newpass"
                name="re-newpass"
                type={inputType}
                placeholder="Nhập lại mật khẩu..."
                className="form-control"
                onChange={e => setReNewPass(e.target.value)}
              />
              <FontAwesomeIcon
                className="eyes-icon"
                icon={showPass ? faEyeSlash : faEye}
                onClick={toggleShowPass}
              />
            </div>
            <span className="form__message"></span>
          </div>

          <button className="btn form-submit">Xác nhận</button>
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

export default Newpass;
