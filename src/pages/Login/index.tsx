import '../base.css';
import './login.css';
import formlogo from '../../assets/images/form__logo.png';
import loginimg from '../../assets/images/login__img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { db } from '../../init/init-firebase';
import { collection, getDocs } from 'firebase/firestore';
import images from '../../assets/images';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const inputType = showPass ? 'text' : 'password';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Kiểm tra thông tin đăng nhập với Firestore
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data?.username === loginData.username && data?.password === loginData.password) {
          // Đăng nhập thành công, chuyển hướng đến trang "/home" và truyền dữ liệu loginData
          localStorage.setItem('loginData', JSON.stringify(loginData));
          navigate('/queueing-system/home');
        } else {
          setErrorMessage('Sai mật khẩu hoặc tên đăng nhập');
        }
      });
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      setErrorMessage('Đã xảy ra lỗi trong quá trình đăng nhập.');
    }

    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <div className="form-side">
        <img src={images.logonew} alt="form-logo" className="form-logo" />
        <form className="login-form" id="login" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Tên đăng nhập *
            </label>
            <div className="login-container">
              <input
                value={loginData.username}
                id="username"
                name="username"
                type="text"
                placeholder="Tài khoản là: aivan01"
                className={`form-control ${errorMessage ? 'input-error' : ''}`}
                onChange={e => setLoginData({ ...loginData, username: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mật khẩu *
            </label>
            <div className="password-container">
              <input
                value={loginData.password}
                id="password"
                name="password"
                type={inputType}
                placeholder="Mật khẩu là: 123456789"
                className={`form-control ${errorMessage ? 'input-error' : ''}`}
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
              />
              <FontAwesomeIcon
                className="eyes-icon"
                icon={showPass ? faEye : faEyeSlash}
                onClick={toggleShowPass}
              />
            </div>
            <span className="form__message">
              {errorMessage && (
                <FontAwesomeIcon className="error__icon" icon={faCircleExclamation} />
              )}
              <span className="error__text">{errorMessage}</span>
            </span>
          </div>

          {!errorMessage && (
            <Link to="/queueing-system/forgetpass" className="forget-password">
              Quên mật khẩu?
            </Link>
          )}

          <button type="submit" className="btn form-submit" disabled={isLoading}>
            {isLoading ? '......' : 'Đăng nhập'}
          </button>

          {errorMessage && (
            <Link to="/queueing-system/forgetpass" className="forget-password">
              Quên mật khẩu?
            </Link>
          )}
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
