import '../../base.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faCaretLeft,
  faCaretRight,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import UserSide from '../../../components/UserSide';
import Table from '../../../components/Table';
import { useEffect, useState } from 'react';
import { db } from '../../../init/init-firebase';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import { formatTimestamp } from '../../Number';
import CalendarPicker from '../../../components/CalendarPicker';

interface Data {
  userName: string;
  nameChange: number;
  addressIP: string;
  timeChange: Timestamp;
}

function HistoryPage() {
  const [data, setData] = useState<Data[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'history');
      const querySnapshot = await getDocs(collectionRef);
      const newData = querySnapshot.docs.map(doc => doc.data() as Data);
      setData(newData);
    };

    fetchData();
  }, []);

  const filteredData = data.filter(row => {
    if (searchKeyword.trim() !== '') {
      const keyword = searchKeyword.toLowerCase();
      const userName = row.userName.toLowerCase();
      const addressIP = row.addressIP.toLowerCase();
      if (!userName.includes(keyword) && !addressIP.includes(keyword)) {
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
    { Header: 'Tên đăng nhập', accessor: 'userName' },
    {
      Header: 'Thời gian tác động',
      accessor: 'timeChange',
      Cell: ({ value }: any) => (
        <span>{value instanceof Timestamp ? formatTimestamp(value) : ''}</span>
      ),
    },
    { Header: 'IP thực hiện', accessor: 'addressIP' },
    { Header: 'Thao tác thực hiện', accessor: 'nameChange' },
  ];

  return (
    <div className="settinguser__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Cài đặt hệ thống</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Nhật ký hoạt động</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__feature">
          <div className="feature__group">
            <label htmlFor="search-input" className="feature__name">
              Chọn thời gian
            </label>
            <CalendarPicker />
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

export default HistoryPage;
