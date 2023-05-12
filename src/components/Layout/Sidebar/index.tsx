import './sidebar.css';
import { NavLink } from 'react-router-dom';
import images from '../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
}

const Sidebar = ({ children }: any) => {
  const menuItem: MenuItem[] = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <img src={images.dashboard} alt="dasgboard_icon" />,
    },
    {
      path: '/device',
      name: 'Thiết bị',
      icon: <img src={images.device} alt="dasgboard_icon" />,
    },
    {
      path: '/service',
      name: 'Dịch vụ',
      icon: <img src={images.service} alt="dasgboard_icon" />,
    },
    {
      path: '/number',
      name: 'Cấp số',
      icon: <img src={images.number} alt="dasgboard_icon" />,
    },
    {
      path: '/report',
      name: 'Báo cáo',
      icon: <img src={images.report} alt="dasgboard_icon" />,
    },
    {
      path: '/setting',
      name: 'Cài đặt hệ thống',
      icon: <img src={images.setting} alt="dasgboard_icon" />,
    },
  ];
  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section">
          <img src={images.logo} alt="logo_Alta" />
        </div>
        {menuItem.map((item: MenuItem, index: number) => (
          <NavLink to={item.path} key={index} className="link">
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
        <button className="btn btn-logout">
          <FontAwesomeIcon icon={faRightFromBracket} className="logout__icon" />
          Đăng xuất
        </button>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
