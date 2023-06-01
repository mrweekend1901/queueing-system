import '../base.css';
import './service.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faCaretLeft,
  faCaretRight,
  faSearch,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import UserSide from '../../components/UserSide';
import Table from '../../components/Table';
import { useEffect, useState } from 'react';
import { db } from '../../init/init-firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import DropDown from '../../components/Dropdown';
import CalendarPicker from '../../components/CalendarPicker';

interface Data {
  serviceId: string;
  serviceName: string;
  serviceDesc: string;
  activeStatus: boolean;
}

const dropdownAction = ['Tất cả', 'Hoạt động', 'Ngưng hoạt động'];

function Service() {
  const [data, setData] = useState<Data[]>([]);
  const [filter, setFilter] = useState({
    activeStatus: 'Tất cả',
    connectStatus: 'Tất cả',
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleDropdownSelect = (selectedOption: string, kind: string) => {
    setFilter({ ...filter, [kind]: selectedOption });
  };

  const filteredData = data.filter(row => {
    if (
      filter.activeStatus !== 'Tất cả' &&
      filter.activeStatus !== (row.activeStatus ? 'Hoạt động' : 'Ngưng hoạt động')
    ) {
      return false;
    }

    if (searchKeyword.trim() !== '') {
      const keyword = searchKeyword.toLowerCase();
      const deviceName = row.serviceName.toLowerCase();
      const deviceId = row.serviceId.toLowerCase();
      if (!deviceName.includes(keyword) && !deviceId.includes(keyword)) {
        return false;
      }
    }
    return true;
  });

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'service');
      const querySnapshot = await getDocs(collectionRef);
      const newData = querySnapshot.docs.map(doc => doc.data() as Data);
      setData(newData);
    };

    fetchData();
  }, []);

  // Table value
  const columns = [
    { Header: 'Mã dịch vụ', accessor: 'serviceId' },
    { Header: 'Tên dịch vụ', accessor: 'serviceName' },
    { Header: 'Mô tả dịch vụ', accessor: 'serviceDesc' },
    { Header: 'Trạng thái hoạt động', accessor: 'activeStatus' },
  ];

  return (
    <div className="service__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Dịch vụ</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Danh sách dịch vụ</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Danh sách dịch vụ</div>
        <div className="content__feature">
          <div className="left__group">
            <div className="feature__group">
              <label htmlFor="active-status" className="feature__name">
                Trạng thái hoạt động
              </label>
              <DropDown
                id="dropdownFilteraction"
                placeholder="Tất cả"
                dropdownWidth="300px"
                dropdownHeight="44px"
                options={dropdownAction}
                onSelect={selectedOption => handleDropdownSelect(selectedOption, 'activeStatus')}
              />
            </div>
            <div className="feature__group">
              <label htmlFor="" className="feature__name">
                Chọn thời gian
              </label>
              <CalendarPicker />
            </div>
          </div>
          <div className="feature__group">
            <label htmlFor="search-input" className="feature__name">
              Từ khóa
            </label>
            <span className="input__container">
              <input
                style={{ width: '300px' }}
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
          <Link to="/service/addservice" className="addtable__link">
            <button className="add__table">
              <FontAwesomeIcon icon={faSquarePlus} className="add__table-icon" />
              Thêm dịch vụ
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

export default Service;
