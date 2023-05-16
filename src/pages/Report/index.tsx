import '../base.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faCaretLeft,
  faCaretRight,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import UserSide from '../../components/UserSide';
import Table from '../../components/Table';
import { useEffect, useState } from 'react';
import { db } from '../../init/init-firebase';
import { Timestamp, collection, getDocs } from 'firebase/firestore';

interface Data {
  numberId: string;
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

function Report() {
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
    <div className="device__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Báo cáo</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Lập báo cáo</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__feature">
          <div className="left__group">
            <div className="feature__group">
              <label htmlFor="" className="feature__name">
                Chọn thời gian
              </label>
              <input type="date" className="date__from" />
              <FontAwesomeIcon icon={faCaretRight} className="date__icon" />
              <input type="date" className="date__to" />
            </div>
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

export default Report;
