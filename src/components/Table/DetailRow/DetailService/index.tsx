import {
  faAngleRight,
  faCaretRight,
  faPen,
  faRotateLeft,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';
import '../../Addtable/addtable.css';
import '../DetailRow.css';
import DropDown from '../../../Dropdown';
import { useEffect, useState } from 'react';
import { db } from '../../../../init/init-firebase';
import { collection, getDocs } from 'firebase/firestore';
import CalendarPicker from '../../../CalendarPicker';
import Table from '../..';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Data {
  numerical: string;
  statusNum: string;
}

const columns = [
  { Header: 'Số thứ tự', accessor: 'numerical' },
  { Header: 'Trạng thái', accessor: 'statusNum' },
];

const dropdownAction = ['Tất cả', 'Đã hoàn thành', 'Đang thực hiện', 'Vắng'];

function DetailService() {
  const [data, setData] = useState<Data[]>([]);
  const [filter, setFilter] = useState({
    status: 'Tất cả',
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  const location = useLocation();
  const row = location.state;

  const handleDropdownSelect = (selectedOption: string, kind: string) => {
    setFilter({ ...filter, [kind]: selectedOption });
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'detailservice');
      const querySnapshot = await getDocs(collectionRef);
      const newData = querySnapshot.docs.map(doc => doc.data() as Data);
      setData(newData);
    };

    fetchData();
  }, []);

  const filteredData = data.filter(row => {
    if (searchKeyword.trim() !== '') {
      const keyword = searchKeyword.toLowerCase();
      const numerical = row.numerical.toLowerCase();
      if (!numerical.includes(keyword)) {
        return false;
      }
    }
    if (filter.status !== 'Tất cả' && row.statusNum !== filter.status) {
      return false;
    }
    return true;
  });

  return (
    <div className="detail__page add__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Cấp số</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__fa">Danh sách cấp số</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Chi tiết</div>
        </div>
        <UserSide />
      </div>
      <div className="content">
        <div className="content__heading">Quản lý dịch vụ</div>
        <span className="content__wrapper-detail">
          <div className="content__body content__body--small">
            <span className="content__group">
              <div className="content__label">Thông tin dịch vụ</div>
              <div className="detail__group">
                <label htmlFor="" className="detail__label">
                  Mã dịch vụ:
                </label>
                <div className="deltail__value">{row.serviceId}</div>
              </div>
              <div className="detail__group">
                <label htmlFor="" className="detail__label">
                  Tên dịch vụ:
                </label>
                <div className="deltail__value">{row.serviceName}</div>
              </div>
              <div className="detail__group">
                <label htmlFor="" className="detail__label">
                  Mô tả:
                </label>
                <div className="deltail__value">{row.serviceDesc}</div>
              </div>
            </span>
            <span className="content__group">
              <div className="content__label">Quy tắc cấp số</div>
              <span className="form__add--1-col">
                <div className="form__group">
                  <span className="detail__label no-marin-left">Tăng tự động:</span>
                  <input className="input__number" value="0001" type="text" disabled />
                  <span className="detail__label no-marin-left">đến</span>
                  <input className="input__number" value="9999" type="text" disabled />
                </div>
                {row.prefix && (
                  <div className="form__group">
                    <span className="detail__label no-marin-left">Prefix:</span>
                    <input className="input__number" value={row.prefixValue} type="text" disabled />
                  </div>
                )}

                {row.surfix && (
                  <div className="form__group">
                    <span className="detail__label no-marin-left">Surfix:</span>
                    <input className="input__number" value={row.surfixValue} type="text" disabled />
                  </div>
                )}

                {row.reset && (
                  <div className="form__group">
                    <span className="detail__label no-marin-left">Reset mỗi ngày</span>
                  </div>
                )}
                {row.prefix && (
                  <div className="form__group">
                    <span className="detail__ex">{`Ví dụ: ${row.serviceId} - ${row.prefixValue}`}</span>
                  </div>
                )}
                {row.surfix && (
                  <div className="form__group">
                    <span className="detail__ex">{`Ví dụ: ${row.surfixValue} - ${row.serviceId}`}</span>
                  </div>
                )}
              </span>
            </span>
          </div>
          <div className="content__body content__body--big">
            <span className="content__feature-head">
              <div className="feature__group">
                <label htmlFor="active-status" className="feature__name">
                  Trạng thái
                </label>
                <DropDown
                  id="dropdownFilteraction"
                  placeholder="Tất cả"
                  dropdownWidth="160px"
                  dropdownHeight="44px"
                  options={dropdownAction}
                  onSelect={selectedOption => handleDropdownSelect(selectedOption, 'status')}
                />
              </div>

              <div className="feature__group feature__group--calendar">
                <label htmlFor="" className="feature__name">
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
                    type="text"
                    className="search-input"
                    placeholder="Nhập từ khóa..."
                    onChange={handleSearchInputChange}
                  />
                  <FontAwesomeIcon className="search-input-icon" icon={faSearch} />
                </span>
              </div>
            </span>
            <span className="content__feature-table">
              <Table columns={columns} data={filteredData} />
            </span>
          </div>
          <span className="content__btn">
            <button className="btn__update radius-top">
              <FontAwesomeIcon className="btn-update__icon" icon={faPen} />
              Cập nhật danh sách
            </button>
            <Link className="btn__link" to="/service">
              <button className="btn__back btn-no-martop radius-bot">
                <FontAwesomeIcon className="btn-back__icon" icon={faRotateLeft} />
                Quay lại
              </button>
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
}

export default DetailService;
