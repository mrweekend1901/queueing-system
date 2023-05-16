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

function Device() {
  interface Data {
    deviceId: string;
    deviceName: string;
    ipAddress: string;
    activeStatus: boolean;
    conectStatus: boolean;
    serviceUse: string;
  }

  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'device');
      const querySnapshot = await getDocs(collectionRef);
      const newData = querySnapshot.docs.map(doc => doc.data() as Data);
      setData(newData);
    };

    fetchData();
  }, []);

  // Table value
  const columns = [
    { Header: 'Mã thiết bị', accessor: 'deviceId' },
    { Header: 'Tên thiết bị', accessor: 'deviceName' },
    { Header: 'Địa chỉ IP', accessor: 'ipAddress' },
    { Header: 'Trạng thái hoạt động', accessor: 'activeStatus' },
    { Header: 'Trạng thái kết nối', accessor: 'conectStatus' },
    { Header: 'Dịch vụ sử dụng', accessor: 'serviceUse' },
  ];

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
              <select name="active-status" id="active-status" className="list__box">
                <option value="all">Tất cả</option>
                <option value="active">Hoạt động</option>
                <option value="not-active">Không hoạt động</option>
              </select>
            </div>
            <div className="feature__group">
              <label htmlFor="connect-status" className="feature__name">
                Trạng thái kết nối
              </label>
              <select name="connect-status" id="connect-status" className="list__box">
                <option value="all">Tất cả</option>
                <option value="active">Hoạt động</option>
                <option value="not-active">Không hoạt động</option>
              </select>
            </div>
          </div>
          <div className="feature__group">
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
            Thêm thiết bị
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

export default Device;
