import '../base.css';
import './newpass.css';
import formlogo from '../../assets/images/form__logo.png';
import loginimg from '../../assets/images/login__img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { db } from '../../init/init-firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';

function Newpass() {
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState('');
  const [reNewPass, setReNewPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passMatchError, setPassMatchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const email = location.state;

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const inputType = showPass ? 'text' : 'password';

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPass === reNewPass) {
      // Mật khẩu khớp, thực hiện thay đổi mật khẩu của người dùng
      const updateUserPassword = async () => {
        try {
          const userRef = collection(db, 'users');
          const userQuery = query(userRef, where('email', '==', email));
          const userSnapshot = await getDocs(userQuery);
          userSnapshot.forEach(async userDoc => {
            await updateDoc(userDoc.ref, { password: reNewPass });
          });

          console.log('Mật khẩu đã được cập nhật thành công');
          navigate('/');
        } catch (error) {
          console.error('Lỗi khi cập nhật mật khẩu:', error);
        }
        setIsLoading(false);
      };

      updateUserPassword();
    } else {
      // Mật khẩu không khớp, hiển thị thông báo lỗi
      setPassMatchError('Mật khẩu không khớp');
    }
  };

  const handleChangeNewPass = (e: any) => {
    setNewPass(e.target.value);
    setPassMatchError('');
  };

  const handleChangeReNewPass = (e: any) => {
    setReNewPass(e.target.value);
    setPassMatchError('');
  };

  return (
    <div className="login-page">
      <div className="form-side">
        <img src={formlogo} alt="form-logo" className="form-logo" />
        <form onSubmit={handleSubmit} className="newpass-form" id="newpass-form">
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
                className={`form-control ${passMatchError ? 'input-error' : ''}`}
                onChange={handleChangeNewPass}
              />
              <FontAwesomeIcon
                className="eyes-icon"
                icon={showPass ? faEye : faEyeSlash}
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
                className={`form-control ${passMatchError ? 'input-error' : ''}`}
                onChange={handleChangeReNewPass}
              />
              <FontAwesomeIcon
                className="eyes-icon"
                icon={showPass ? faEye : faEyeSlash}
                onClick={toggleShowPass}
              />
            </div>
            <span className="form__message">
              {passMatchError && (
                <FontAwesomeIcon className="error__icon" icon={faCircleExclamation} />
              )}
              <span className="error__text">{passMatchError}</span>
            </span>
          </div>

          <button type="submit" className="btn form-submit" disabled={isLoading}>
            {isLoading ? '......' : 'Xác nhận'}
          </button>
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
