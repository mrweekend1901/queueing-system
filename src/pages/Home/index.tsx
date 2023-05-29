import './home.css';
import '../base.css';
import images from '../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import UserSide from '../../components/UserSide';
import { db } from '../../init/init-firebase';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface LoginData {
  username: string;
}

interface UserData {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

function Home() {
  const loginDataJson = localStorage.getItem('loginData');
  const loginData: LoginData | null = loginDataJson ? JSON.parse(loginDataJson) : null;
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (loginData && loginData.username) {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('username', '==', loginData.username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          const userData = doc.data() as UserData;
          setUserData(userData);
        });
      }
    };

    fetchUserData();
  }, [loginData]);

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
              <p className="content__name">{userData?.fullName}</p>
            </div>
            <p className="content__name"></p>
          </div>
          <div className="input__col">
            <div className="input__form">
              <label className="input__label" htmlFor="fullname">
                Tên người dùng
              </label>
              <input className="input__value" type="text" value={userData?.fullName} disabled />
            </div>
            <div className="input__form">
              <label className="input__label" htmlFor="phone">
                Số điện thoại
              </label>
              <input className="input__value" type="text" value={userData?.phoneNumber} disabled />
            </div>
            <div className="input__form">
              <label className="input__label" htmlFor="email">
                Email
              </label>
              <input className="input__value" type="text" value={userData?.email} disabled />
            </div>
          </div>
          <div className="input__col">
            <div className="input__form">
              <label className="input__label" htmlFor="username">
                Tên đăng nhập
              </label>
              <input className="input__value" type="text" value={userData?.username} disabled />
            </div>
            <div className="input__form">
              <label className="input__label" htmlFor="password">
                Mật khẩu
              </label>
              <input className="input__value" type="text" value={userData?.password} disabled />
            </div>
            <div className="input__form">
              <label className="input__label" htmlFor="role">
                Vai trò
              </label>
              <input className="input__value" type="text" value={userData?.role} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
