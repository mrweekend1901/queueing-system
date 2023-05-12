import './userside.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '../../assets/images';
import { faBell } from '@fortawesome/free-regular-svg-icons';

function UserSide() {
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
          <p className="user__name">Lê Quỳnh Ái Vân</p>
        </div>
      </div>
    </div>
  );
}

export default UserSide;
