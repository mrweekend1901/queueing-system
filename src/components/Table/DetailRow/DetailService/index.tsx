import { faAngleRight, faCaretRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';

import '../../Addtable/addtable.css';
import '../DetailRow.css';
import DropDown from '../../../Dropdown';
import { useState } from 'react';
import CalendarPicker from '../../../CalendarPicker';

const dropdownAction = ['Tất cả', 'Đã hoàn thành', 'Đang thực hiện', 'Vắng'];

function DetailService() {
  const [filter, setFilter] = useState({
    activeStatus: 'Tất cả',
  });

  const [showCalendar, setShowCalendar] = useState(false); // State to control the visibility of the calendar

  const handleDropdownSelect = (selectedOption: string, kind: string) => {
    setFilter({ ...filter, [kind]: selectedOption });
  };

  const handleDateFromClick = () => {
    setShowCalendar(true); // Show the calendar when date__from input is clicked
  };

  const handleDateFromBlur = () => {
    setShowCalendar(false); // Hide the calendar when date__from input loses focus
  };

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
                <div className="deltail__value">test</div>
              </div>
              <div className="detail__group">
                <label htmlFor="" className="detail__label">
                  Tên dịch vụ:
                </label>
                <div className="deltail__value">test</div>
              </div>
              <div className="detail__group">
                <label htmlFor="" className="detail__label">
                  Mô tả:
                </label>
                <div className="deltail__value">test</div>
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
                <div className="form__group">
                  <span className="detail__label no-marin-left">Prefix:</span>
                  <input className="input__number" value="0001" type="text" disabled />
                </div>
                <div className="form__group">
                  <span className="detail__label no-marin-left">Surfix:</span>
                  <input className="input__number" value="0001" type="text" disabled />
                </div>
                <div className="form__group">
                  <span className="detail__label no-marin-left">Reset mỗi ngày</span>
                </div>
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
                  onSelect={selectedOption => handleDropdownSelect(selectedOption, 'activeStatus')}
                />
              </div>

              <div className="feature__group feature__group--calendar">
                <label htmlFor="" className="feature__name">
                  Chọn thời gian
                </label>
                <input
                  type="text"
                  className="date__from"
                  onFocus={handleDateFromClick}
                  // onBlur={handleDateFromBlur}
                />
                <FontAwesomeIcon icon={faCaretRight} className="date__icon" />
                <input type="text" className="date__to" disabled />
                {showCalendar && <CalendarPicker />}
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
                    //   value={searchKeyword}
                    //   onChange={handleSearchInputChange}
                  />
                  <FontAwesomeIcon className="search-input-icon" icon={faSearch} />
                </span>
              </div>
            </span>
          </div>
        </span>
      </div>
    </div>
  );
}

export default DetailService;
