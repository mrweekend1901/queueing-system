import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import './sidebar.css';
import images from '../../../assets/images';

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
      icon: <img src={images.dashboard} alt="dashboard_icon" />,
    },
    {
      path: '/device',
      name: 'Thiết bị',
      icon: <img src={images.device} alt="device_icon" />,
    },
    {
      path: '/service',
      name: 'Dịch vụ',
      icon: <img src={images.service} alt="service_icon" />,
    },
    {
      path: '/number',
      name: 'Cấp số',
      icon: <img src={images.number} alt="number_icon" />,
    },
    {
      path: '/report',
      name: 'Báo cáo',
      icon: <img src={images.report} alt="report_icon" />,
    },
    {
      path: '/setting',
      name: 'Cài đặt hệ thống',
      icon: <img src={images.setting} alt="setting_icon" />,
    },
  ];

  const renderMenuItem = (menuItem: MenuItem, index: number) => {
    return (
      <li key={index}>
        <NavLink to={menuItem.path} className="link">
          <div className="icon">{menuItem.icon}</div>
          <div className="link_text">{menuItem.name}</div>
        </NavLink>
      </li>
    );
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section">
          <Link to="/home">
            <img src={images.logo} alt="logo_Alta" />
          </Link>
        </div>
        <ul>{menuItem.map((item: MenuItem, index: number) => renderMenuItem(item, index))}</ul>
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
