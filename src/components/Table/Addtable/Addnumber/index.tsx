import '../../../../pages/base.css';
import React, { useState } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';
import { Link } from 'react-router-dom';
import DropDown from '../../../Dropdown';
import './Addnum.css';
import Popup from '../../../Popup';

interface FormData {
  serviceUse: string;
}

const dropdownList = [
  'Khám tim mạch',
  'Khám sản phụ khoa',
  'Khám răng hàm mặt',
  'Khám tai mũi họng',
  'Khám hô hấp',
  'Khám tổng quát',
];

function Addnumber() {
  const [formData, setFormData] = useState<FormData>({
    serviceUse: '',
  });

  const handleDropdownSelect = (selectedOption: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      serviceUse: selectedOption,
    }));
  };

  const [showPopup, setShowPopup] = useState(false);

  const openPopup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="add__page num__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Cấp số</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__fa">Danh sách cấp số</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Cấp số mới</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Quản lý cấp số</div>
        <form className="form__add">
          <div className="content__body content__body--center">
            <div className="content__label">Cấp số mới</div>
            <div className="form__group">
              <label htmlFor="deviceID" className="form__label">
                Dịch vụ khách hàng lựa chọn
              </label>
              <DropDown
                id=""
                placeholder="Chọn dịch vụ"
                dropdownWidth="540px"
                dropdownHeight="44px"
                options={dropdownList}
                onSelect={handleDropdownSelect}
              />
            </div>
            <div className="btn__group">
              <Link to="/device">
                <button className="btn form-cancel">Hủy bỏ</button>
              </Link>
              <button className="btn form-submit" onClick={openPopup}>
                In số
              </button>
            </div>
          </div>
        </form>
        <div>{showPopup && <Popup onClose={closePopup} />}</div>
      </div>
    </div>
  );
}

export default Addnumber;
