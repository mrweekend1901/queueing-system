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

interface Data {
  numberId: string;
  customerName: string;
  serviceName: string;
  timeStart: Timestamp;
  timeEnd: Timestamp;
  status: string;
  supply: string;
}

// Hiển thị Giờ - Ngày
function formatTimestamp(timestamp: any) {
  const date = timestamp.toDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const formattedDate = date.toLocaleDateString();
  return `${hours}:${minutes} - ${formattedDate}`;
}

function NumberPage() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'number');
      const querySnapshot = await getDocs(collectionRef);
      const newData = querySnapshot.docs.map(doc => doc.data() as Data);
      setData(newData);
    };

    fetchData();
  }, []);

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
            <select name="active-status" id="active-status" className="list__box">
              <option className="list__box-item" value="all">
                Tất cả
              </option>
              <option className="list__box-item" value="active">
                Khám sản - Phụ khoa
              </option>
              <option className="list__box-item" value="not-active">
                Khám răng hàm mặt
              </option>
              <option className="list__box-item" value="not-active">
                Khám tai mũi họng
              </option>
            </select>
          </div>
          <div className="feature__group">
            <label htmlFor="active-status" className="feature__name">
              Tình trạng
            </label>
            <select name="active-status" id="active-status" className="list__box">
              <option className="list__box-item" value="all">
                Tất cả
              </option>
              <option className="list__box-item" value="active">
                Đang chờ
              </option>
              <option className="list__box-item" value="not-active">
                Đã sử dụng
              </option>
              <option className="list__box-item" value="not-active">
                Bỏ qua
              </option>
            </select>
          </div>
          <div className="feature__group">
            <label htmlFor="active-status" className="feature__name">
              Nguồn cấp
            </label>
            <select name="active-status" id="active-status" className="list__box">
              <option className="list__box-item" value="all">
                Tất cả
              </option>
              <option className="list__box-item" value="active">
                Kiosk
              </option>
              <option className="list__box-item" value="not-active">
                Hệ thống
              </option>
            </select>
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
              <input type="text" className="search-input" placeholder="Nhập từ khóa..." />
              <FontAwesomeIcon className="search-input-icon" icon={faSearch} />
            </span>
          </div>
        </div>

        <div className="content__board">
          <Table columns={columns} data={data} />
          <button className="add__table">
            <FontAwesomeIcon icon={faSquarePlus} className="add__table-icon" />
            Thêm dịch vụ
          </button>
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
