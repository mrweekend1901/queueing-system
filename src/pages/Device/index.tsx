import '../base.css';
import './device.css';
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

interface Data {
  deviceId: string;
  deviceName: string;
  ipAddress: string;
  activeStatus: boolean;
  connectStatus: boolean;
  serviceUse: string;
}

const columns = [
  { Header: 'Mã thiết bị', accessor: 'deviceId' },
  { Header: 'Tên thiết bị', accessor: 'deviceName' },
  { Header: 'Địa chỉ IP', accessor: 'ipAddress' },
  { Header: 'Trạng thái hoạt động', accessor: 'activeStatus' },
  { Header: 'Trạng thái kết nối', accessor: 'connectStatus' },
  { Header: 'Dịch vụ sử dụng', accessor: 'serviceUse' },
];

const dropdownAction = ['Tất cả', 'Hoạt động', 'Ngưng hoạt động'];
const dropdownConnect = ['Tất cả', 'Kết nối', 'Mất kết nối'];

function Device() {
  const [data, setData] = useState<Data[]>([]);
  const [filter, setFilter] = useState({
    activeStatus: 'Tất cả',
    connectStatus: 'Tất cả',
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleDropdownSelect = (selectedOption: string, kind: string) => {
    setFilter({ ...filter, [kind]: selectedOption });
  };

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'device');
      const querySnapshot = await getDocs(collectionRef);
      const newData = querySnapshot.docs.map(doc => doc.data() as Data);
      setData(newData);
    };

    fetchData();
  }, []);

  const filteredData = data.filter(row => {
    if (
      filter.activeStatus !== 'Tất cả' &&
      filter.activeStatus !== (row.activeStatus ? 'Hoạt động' : 'Ngưng hoạt động')
    ) {
      return false;
    }
    if (
      filter.connectStatus !== 'Tất cả' &&
      filter.connectStatus !== (row.connectStatus ? 'Kết nối' : 'Mất kết nối')
    ) {
      return false;
    }
    if (searchKeyword.trim() !== '') {
      const keyword = searchKeyword.toLowerCase();
      const deviceName = row.deviceName.toLowerCase();
      const deviceId = row.deviceId.toLowerCase();
      if (!deviceName.includes(keyword) && !deviceId.includes(keyword)) {
        return false;
      }
    }
    return true;
  });

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <div className="device__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Thiết bị</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Danh sách thiết bị</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Danh sách thiết bị</div>
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
              <label htmlFor="connect-status" className="feature__name">
                Trạng thái kết nối
              </label>
              <DropDown
                id="dropdownFilterconnect"
                placeholder="Tất cả"
                dropdownWidth="300px"
                dropdownHeight="44px"
                options={dropdownConnect}
                onSelect={selectedOption => handleDropdownSelect(selectedOption, 'connectStatus')}
              />
            </div>
          </div>
          <div className="feature__group">
            <label htmlFor="search-input" className="feature__name">
              Từ khóa
            </label>
            <span className="input__container">
              <input
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
          <Link to="/device/adddevice" className="addtable__link">
            <button className="add__table">
              <FontAwesomeIcon icon={faSquarePlus} className="add__table-icon" />
              Thêm thiết bị
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

export default Device;
