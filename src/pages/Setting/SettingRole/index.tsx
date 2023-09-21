import '../../base.css';
import './settingrole.css';
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

interface Data {
  roleName: string;
  numberOfRole: number;
  roleDesc: string;
}

function SettingRole() {
  const [data, setData] = useState<Data[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'settingrole');
      const querySnapshot = await getDocs(collectionRef);
      const newData = querySnapshot.docs.map(doc => doc.data() as Data);
      setData(newData);
    };

    fetchData();
  }, []);

  const filteredData = data.filter(row => {
    if (searchKeyword.trim() !== '') {
      const keyword = searchKeyword.toLowerCase();
      const roleName = row.roleName.toLowerCase();
      if (!roleName.includes(keyword)) {
        return false;
      }
    }
    return true;
  });

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  // Table value
  const columns = [
    { Header: 'Tên vai trò', accessor: 'roleName' },
    { Header: 'Số người dùng', accessor: 'numberOfRole' },
    { Header: 'Mô tả', accessor: 'roleDesc' },
  ];

  return (
    <div className="settingrole__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Cài đặt hệ thống</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Quản lý vai trò</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Danh sách vai trò</div>
        <div className="content__feature">
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
          <Link to="/queueing-system/setting/settingrole/addrole" className="addtable__link">
            <button className="add__table">
              <FontAwesomeIcon icon={faSquarePlus} className="add__table-icon" />
              Thêm vai trò
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

export default SettingRole;
