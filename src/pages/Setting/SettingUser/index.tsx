import '../../base.css';
import './settinguser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faCaretLeft,
  faCaretRight,
  faSearch,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import UserSide from '../../../components/UserSide';
import Table from '../../../components/Table';
import { useEffect, useState } from 'react';
import { db } from '../../../init/init-firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import DropDown from '../../../components/Dropdown';

interface Data {
  fullName: string;
  username: string;
  phoneNumber: string;
  email: string;
  role: string;
  activeStatus: boolean;
}

const dropdownList = ['Tất cả', 'Kế toán', 'Bác sĩ', 'Lễ tân'];

function SettingUser() {
  const [data, setData] = useState<Data[]>([]);
  const [filter, setFilter] = useState({
    role: 'Tất cả',
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(collectionRef);
      const newData = querySnapshot.docs.map(doc => doc.data() as Data);
      setData(newData);
    };

    fetchData();
  }, []);

  const filteredData = data.filter(row => {
    if (searchKeyword.trim() !== '') {
      const keyword = searchKeyword.toLowerCase();
      const username = row.username.toLowerCase();
      const fullName = row.fullName.toLowerCase();
      if (!username.includes(keyword) && !fullName.includes(keyword)) {
        return false;
      }
    }
    if (filter.role !== 'Tất cả' && row.role !== filter.role) {
      return false;
    }
    return true;
  });

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleDropdownSelect = (selectedOption: string, kind: string) => {
    setFilter({ ...filter, [kind]: selectedOption });
  };

  // Table value
  const columns = [
    { Header: 'Tên đăng nhập', accessor: 'username' },
    { Header: 'Họ tên', accessor: 'fullName' },
    { Header: 'Số điện thoại', accessor: 'phoneNumber' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Vai trò', accessor: 'role' },
    { Header: 'Trạng thái hoạt động', accessor: 'activeStatus' },
  ];

  return (
    <div className="settinguser__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Cài đặt hệ thống</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Quản lý tài khoản</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Danh sách tài khoản</div>
        <div className="content__feature">
          <div className="feature__group">
            <label htmlFor="search-input" className="feature__name">
              Từ khóa
            </label>
            <DropDown
              id="dropdownFilterrole"
              placeholder="Tất cả"
              dropdownWidth="300px"
              dropdownHeight="44px"
              options={dropdownList}
              onSelect={selectedOption => handleDropdownSelect(selectedOption, 'role')}
            />
          </div>
          <div className="feature__group search__group">
            <label htmlFor="search-input" className="feature__name">
              Từ khóa
            </label>
            <span className="input__container">
              <input
                style={{ width: '240px' }}
                type="text"
                className="search-input"
                placeholder="Nhập từ khóa..."
                value={searchKeyword}
                onChange={handleSearchInputChange}
              />
              <FontAwesomeIcon className="search-input-icon" icon={faSearch} />
            </span>
          </div>
        </div>

        <div className="content__board">
          <Table columns={columns} data={filteredData} />
          <Link to="/setting/settinguser/adduser" className="addtable__link">
            <button className="add__table">
              <FontAwesomeIcon icon={faSquarePlus} className="add__table-icon" />
              Thêm tài khoản
            </button>
          </Link>
        </div>
      </div>

      <div className="paging">
        <FontAwesomeIcon icon={faCaretLeft} className="paging__icon" />
        <ul className="paging__list">
          <li className="paging__item paging__active">1</li>
          <li className="paging__item">2</li>
          <li className="paging__item">3</li>
          <li className="paging__item">4</li>
          <li className="paging__item">5</li>
          <li className="paging__item">...</li>
          <li className="paging__item">10</li>
        </ul>
        <FontAwesomeIcon icon={faCaretRight} className="paging__icon" />
      </div>
    </div>
  );
}

export default SettingUser;
