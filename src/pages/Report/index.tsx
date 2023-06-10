import '../base.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faCaretLeft,
  faCaretRight,
  faFileArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import UserSide from '../../components/UserSide';
import { useEffect, useState } from 'react';
import { db } from '../../init/init-firebase';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import CalendarPicker from '../../components/CalendarPicker';
import IconDropDown from '../../components/IconDropdown';
import TableWithFilter from '../../components/TableWithFilter';
import IconDropDownCheckbox from '../../components/IconDropdownCheckbox';

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

const dropdownListID = ['Tất cả', '2010001', '2010002', '2010005'];
const dropdownListService = [
  'Tất cả',
  'Khám tổng quát',
  'Khám tim mạch',
  'Khám sản - Phụ khoa',
  'Khám răng hàm mặt',
];
// const dropdownListID = ['Tất cả', '2010001', '2010002', '2010005'];
const dropdownListStatus = ['Tất cả', 'Đang chờ', 'Đã sử dụng', 'Bỏ qua'];
const dropdownListSupply = ['Tất cả', 'Kiosk', 'Hệ thống'];

function Report() {
  const [data, setData] = useState<Data[]>([]);
  const [filter, setFilter] = useState({
    numberId: 'Tất cả',
    status: 'Tất cả',
    supply: 'Tất cả',
    serviceName: [] as string[],
  });

  const handleDropdownSelect = (selectedOption: string, kind: string) => {
    setFilter({ ...filter, [kind]: selectedOption });
  };

  const handleDropdownSelectCheckbox = (selectedOptions: string[], kind: string) => {
    setFilter({ ...filter, [kind]: selectedOptions });
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
    if (filter.numberId !== 'Tất cả' && row.numberId !== filter.numberId) {
      return false;
    }
    if (filter.status !== 'Tất cả' && row.status !== filter.status) {
      return false;
    }
    if (filter.supply !== 'Tất cả' && row.supply !== filter.supply) {
      return false;
    }
    if (filter.supply !== 'Tất cả' && row.supply !== filter.supply) {
      return false;
    }
    if (
      filter.serviceName.length > 0 &&
      !filter.serviceName.includes('Tất cả') &&
      !filter.serviceName.includes(row.serviceName)
    ) {
      return false;
    }
    return true;
  });

  // Table value
  const columns = [
    {
      Header: 'STT',
      accessor: 'numberId',
      icon: (
        <IconDropDown
          id="numberId"
          dropdownWidth="30px"
          dropdownHeight="30px"
          options={dropdownListID}
          onSelect={selectedOption => handleDropdownSelect(selectedOption, 'numberId')}
        />
      ),
    },
    {
      Header: 'Tên dịch vụ',
      accessor: 'serviceName',
      icon: (
        <IconDropDownCheckbox
          id="numberId"
          dropdownWidth="30px"
          dropdownHeight="30px"
          options={dropdownListService}
          onSelect={selectedOption => handleDropdownSelectCheckbox(selectedOption, 'serviceName')}
        />
      ),
    },
    {
      Header: 'Thời gian cấp',
      accessor: 'timeStart',
      Cell: ({ value }: any) => (
        <span>{value instanceof Timestamp ? formatTimestamp(value) : ''}</span>
      ),
      icon: (
        <IconDropDown
          id="numberId"
          dropdownWidth="30px"
          dropdownHeight="30px"
          options={dropdownListID}
          onSelect={selectedOption => handleDropdownSelect(selectedOption, 'serviceName')}
        />
      ),
    },
    {
      Header: 'Trạng thái',
      accessor: 'status',
      icon: (
        <IconDropDown
          id="numberId"
          dropdownWidth="30px"
          dropdownHeight="30px"
          options={dropdownListStatus}
          onSelect={selectedOption => handleDropdownSelect(selectedOption, 'status')}
        />
      ),
    },
    {
      Header: 'Nguồn cấp',
      accessor: 'supply',
      icon: (
        <IconDropDown
          id="numberId"
          dropdownWidth="30px"
          dropdownHeight="30px"
          options={dropdownListSupply}
          onSelect={selectedOption => handleDropdownSelect(selectedOption, 'supply')}
        />
      ),
    },
  ];

  console.log(filter);
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
              <CalendarPicker />
            </div>
          </div>
        </div>

        <div className="content__board">
          <TableWithFilter columns={columns} data={filteredData} />
          <button className="add__table">
            <FontAwesomeIcon icon={faFileArrowDown} className="add__table-icon" />
            Tải về
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
