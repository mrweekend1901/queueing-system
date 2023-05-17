import '../base.css';
import './forget.css';
import formlogo from '../../assets/images/form__logo.png';
import loginimg from '../../assets/images/login__img.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../../init/init-firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

function Forgetpass() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // Kiểm tra email trong Firestore
    const usersCollectionRef = collection(db, 'users');
    const q = query(usersCollectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      // Email đã tồn tại trong Firestore, điều hướng đến /newpass
      navigate('/newpass', { state: email });
    } else {
      // Email không tồn tại trong Firestore, thực hiện xử lý thông báo lỗi
      setEmailError('Email không tồn tại');
      setEmail('');
    }
    setIsLoading(false);
  };

  const handleChange = (e: any) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  return (
    <div className="login-page">
      <div className="form-side">
        <img src={formlogo} alt="form-logo" className="form-logo" />
        <form onSubmit={handleSubmit} className="forget-form" id="forget-form">
          <div className="form-group">
            <label className="heading-forget-pass">Đặt lại mật khẩu</label>
            <label htmlFor="email" className="form-label">
              Vui lòng nhập email để đặt lại mật khẩu cho bạn *
            </label>
            <div className="login-container">
              <input
                id="email"
                name="email"
                type="text"
                className={`form-control ${emailError ? 'input-error' : ''}`}
                value={email}
                onChange={handleChange}
              />
            </div>
            <span className="form__message">
              {emailError && <FontAwesomeIcon className="error__icon" icon={faCircleExclamation} />}
              <span className="error__text">{emailError}</span>
            </span>
          </div>

          <div className="btn-group">
            <Link to="/login">
              <button className="btn form-cancel">Hủy</button>
            </Link>
            <button type="submit" className="btn form-continue" disabled={isLoading}>
              {isLoading ? '......' : 'Tiếp tục'}
            </button>
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
