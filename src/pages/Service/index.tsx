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

function Service() {
  interface Data {
    serviceId: string;
    serviceName: string;
    serviceDesc: string;
    activeStatus: boolean;
  }

  const [data, setData] = useState<Data[]>([]);

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
              <select name="active-status" id="active-status" className="list__box">
                <option value="all">Tất cả</option>
                <option value="active">Hoạt động</option>
                <option value="not-active">Ngưng hoạt động</option>
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
