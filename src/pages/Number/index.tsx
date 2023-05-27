import '../base.css';
import './number.css';
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
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import DropDown from '../../components/Dropdown';

interface Data {
  numberId: string;
  customerName: string;
  serviceName: string;
  timeStart: Timestamp;
  timeEnd: Timestamp;
  status: string;
  supply: string;
}

const dropdownServiceName = [
  'Tất cả',
  'Khám tổng quát',
  'Khám sản - Phụ khoa',
  'Khám tim mạch',
  'Khám mũi họng',
];
const dropdownStatus = ['Tất cả', 'Đang chờ', 'Bỏ qua', 'Đã sử dụng'];

const dropdownType = ['Tất cả', 'Kiosk', 'Hệ thống'];

// Hiển thị Giờ - Ngày
export function formatTimestamp(timestamp: any) {
  if (typeof timestamp === 'object' && timestamp.seconds && timestamp.nanoseconds) {
    const newTimestamp = Timestamp.fromMillis(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
    );
    const date = newTimestamp.toDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = date.toLocaleDateString();
    return `${hours}:${minutes} - ${formattedDate}`;
  }
  return '';
}

function NumberPage() {
  const [data, setData] = useState<Data[]>([]);
  const [filter, setFilter] = useState({
    serviceName: 'Tất cả',
    status: 'Tất cả',
    supply: 'Tất cả',
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleDropdownSelect = (selectedOption: string, kind: string) => {
    setFilter({ ...filter, [kind]: selectedOption });
  };

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'number');
      const querySnapshot = await getDocs(collectionRef);
      const newData = querySnapshot.docs.map(doc => doc.data() as Data);
      setData(newData);
    };

    fetchData();
  }, []);

  const filteredData = data.filter(row => {
    if (searchKeyword.trim() !== '') {
      const keyword = searchKeyword.toLowerCase();
      const deviceName = row.customerName.toLowerCase();
      const deviceId = row.numberId.toLowerCase();
      if (!deviceName.includes(keyword) && !deviceId.includes(keyword)) {
        return false;
      }
    }
    if (filter.serviceName !== 'Tất cả' && row.serviceName !== filter.serviceName) {
      return false;
    }
    if (filter.status !== 'Tất cả' && row.status !== filter.status) {
      return false;
    }
    if (filter.supply !== 'Tất cả' && row.supply !== filter.supply) {
      return false;
    }
    return true;
  });

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  // Table value
  const columns = [
    { Header: 'STT', accessor: 'numberId' },
    { Header: 'Tên khách hàng', accessor: 'customerName' },
    { Header: 'Tên dịch vụ', accessor: 'serviceName' },
    {
      Header: 'Thời gian cấp',
      accessor: 'timeStart',
      Cell: ({ value }: any) => (
        <span>{value instanceof Timestamp ? formatTimestamp(value) : ''}</span>
      ),
    },
    {
      Header: 'Hạn sử dụng',
      accessor: 'timeEnd',
      Cell: ({ value }: any) => (
        <span>{value instanceof Timestamp ? formatTimestamp(value) : ''}</span>
      ),
    },
    { Header: 'Trạng thái', accessor: 'status' },
    { Header: 'Nguồn cấp', accessor: 'supply' },
  ];

  return (
    <div className="number__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Cấp số</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Danh sách cấp số</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Quản lý cấp số</div>
        <div className="content__feature">
          <div className="feature__group">
            <label htmlFor="active-status" className="feature__name">
              Tên dịch vụ
            </label>
            <DropDown
              id="dropdownFilterconnect"
              placeholder="Tất cả"
              dropdownWidth="154px"
              dropdownHeight="44px"
              options={dropdownServiceName}
              onSelect={selectedOption => handleDropdownSelect(selectedOption, 'serviceName')}
            />
          </div>
          <div className="feature__group">
            <label htmlFor="active-status" className="feature__name">
              Tình trạng
            </label>
            <DropDown
              id="dropdownFilterconnect"
              placeholder="Tất cả"
              dropdownWidth="154px"
              dropdownHeight="44px"
              options={dropdownStatus}
              onSelect={selectedOption => handleDropdownSelect(selectedOption, 'status')}
            />
          </div>
          <div className="feature__group">
            <label htmlFor="active-status" className="feature__name">
              Nguồn cấp
            </label>
            <DropDown
              id="dropdownFilterconnect"
              placeholder="Tất cả"
              dropdownWidth="154px"
              dropdownHeight="44px"
              options={dropdownType}
              onSelect={selectedOption => handleDropdownSelect(selectedOption, 'supply')}
            />
          </div>
          <div className="feature__group">
            <label htmlFor="" className="feature__name">
              Chọn thời gian
            </label>
            <input type="date" className="date__from" />
            <FontAwesomeIcon icon={faCaretRight} className="date__icon" />
            <input type="date" className="date__to" />
          </div>
          <div className="feature__group search__group">
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
          <Link to="/number/addnumber" className="addtable__link">
            <button className="add__table">
              <FontAwesomeIcon icon={faSquarePlus} className="add__table-icon" />
              Cấp số mới
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

export default NumberPage;
