import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faDisplay,
  faEllipsisVertical,
  faFileLines,
  faGear,
  faGripVertical,
  faLayerGroup,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import images from '../../../assets/images';

interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
  drop?: JSX.Element;
}

const Sidebar = ({ children }: any) => {
  const navigate = useNavigate();

  const menuItem: MenuItem[] = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FontAwesomeIcon icon={faGripVertical} />,
    },
    {
      path: '/device',
      name: 'Thiết bị',
      icon: <FontAwesomeIcon icon={faDisplay} />,
    },
    {
      path: '/service',
      name: 'Dịch vụ',
      icon: <FontAwesomeIcon icon={faComments} />,
    },
    {
      path: '/number',
      name: 'Cấp số',
      icon: <FontAwesomeIcon icon={faLayerGroup} />,
    },
    {
      path: '/report',
      name: 'Báo cáo',
      icon: <FontAwesomeIcon icon={faFileLines} />,
    },
    {
      path: '/setting',
      name: 'Cài đặt hệ thống',
      icon: <FontAwesomeIcon icon={faGear} />,
      drop: <FontAwesomeIcon icon={faEllipsisVertical} />,
    },
  ];

  const renderMenuItem = (menuItem: MenuItem, index: number) => {
    return (
      <li className="sidebar_item" key={index}>
        <NavLink to={menuItem.path} className="link">
          <div className="icon">{menuItem.icon}</div>
          <div className="link_text">{menuItem.name}</div>
          <div className="icon icon-drop">{menuItem.drop}</div>
          {menuItem.drop && (
            <ul className="setting-list">
              <Link className="link_tag" to="/setting/settingrole">
                <li className="setting-item">Quản lý vai trò</li>
              </Link>
              <Link className="link_tag" to="/setting/settinguser">
                <li className="setting-item">Quản lý tài khoản</li>
              </Link>
              <Link className="link_tag" to="/setting/history">
                <li className="setting-item">Nhật ký người dùng</li>
              </Link>
            </ul>
          )}
        </NavLink>
      </li>
    );
  };

  // Xử lý logic đăng xuất
  const handleLogout = () => {
    // Xóa loginData từ localStorage
    localStorage.removeItem('loginData');
    // Chuyển hướng đến trang đăng nhập
    navigate('/');
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

        <button className="btn btn-logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} className="logout__icon" />
          Đăng xuất
        </button>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
