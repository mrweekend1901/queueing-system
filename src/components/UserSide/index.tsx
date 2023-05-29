import './userside.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '../../assets/images';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { db } from '../../init/init-firebase';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface LoginData {
  username: string;
}

function UserSide() {
  const loginDataJson = localStorage.getItem('loginData');
  const loginData: LoginData | null = loginDataJson ? JSON.parse(loginDataJson) : null;
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (loginData && loginData.username) {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('username', '==', loginData.username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          const userData = doc.data();
          setFullName(userData.fullName);
        });
      }
    };

    fetchUserData();
  }, [loginData]);

  return (
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
          <p className="user__name">{fullName}</p>
        </div>
      </div>
    </div>
  );
}

export default UserSide;
