import React, { useState } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';
import DropDown from '../../../Dropdown';
import TagDropDown from '../../../Dropdowntag';
import { db } from '../../../../init/init-firebase';
import { collection, addDoc } from 'firebase/firestore';

import '../../../../pages/base.css';
import '../addtable.css';
import './adddevice.css';
import { Link } from 'react-router-dom';

const dropdownList = ['Kiosk', 'Display counter'];

const tagOptions = [
  'Khám tim mạch',
  'Khám sản phụ khoa',
  'Khám răng hàm mặt',
  'Khám tai mũi họng',
  'Khám hô hấp',
  'Khám tổng quát',
];

interface FormData {
  deviceId: string;
  deviceType: string;
  deviceName: string;
  userName: string;
  ipAddress: string;
  passWord: string;
  serviceUse: string;
  connectStatus: boolean;
  activeStatus: boolean;
}

function Adddevice() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    deviceId: '',
    deviceType: '',
    deviceName: '',
    userName: '',
    ipAddress: '',
    passWord: '',
    serviceUse: '',
    connectStatus: true,
    activeStatus: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDropdownSelect = (selectedOption: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      deviceType: selectedOption,
    }));
  };

  const handleTagSelect = (selectedOptions: string[]) => {
    setSelectedTags(selectedOptions);
    setFormData(prevFormData => ({
      ...prevFormData,
      serviceUse: selectedOptions.join(', '),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'device'), formData);
      console.log('Device added with ID: ', docRef.id);
      // Reset form data
      setFormData({
        deviceId: '',
        deviceType: '',
        deviceName: '',
        userName: '',
        ipAddress: '',
        passWord: '',
        serviceUse: '',
        connectStatus: true,
        activeStatus: true,
      });
    } catch (error) {
      console.error('Error adding device: ', error);
    }
  };

  return (
    <div className="adddevice__page add__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Thiết bị</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__fa">Danh sách thiết bị</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Thêm thiết bị</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Quản lý thiết bị</div>
        <form className="form__add" onSubmit={handleSubmit}>
          <div className="content__body">
            <div className="content__label">Thông tin thiết bị</div>
            <span className="form__add--2-col">
              <div className="form__group">
                <label htmlFor="deviceId" className="form__label">
                  Mã thiết bị:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value"
                  type="text"
                  name="deviceId"
                  value={formData.deviceId}
                  placeholder="Nhập mã thiết bị"
                  onChange={handleInputChange}
                />
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Loại thiết bị:
                  <span className="form__label--icon">*</span>
                </label>
                <DropDown
                  id=""
                  placeholder="Chọn loại thiết bị"
                  dropdownWidth="540px"
                  dropdownHeight="44px"
                  options={dropdownList}
                  onSelect={handleDropdownSelect}
                />
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="deviceName" className="form__label">
                  Tên thiết bị:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value"
                  type="text"
                  name="deviceName"
                  value={formData.deviceName}
                  placeholder="Nhập tên thiết bị"
                  onChange={handleInputChange}
                />
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="userName" className="form__label">
                  Tên đăng nhập:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value"
                  type="text"
                  name="userName"
                  value={formData.userName}
                  placeholder="Nhập tên đăng nhập"
                  onChange={handleInputChange}
                />
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="ipAddress" className="form__label">
                  Địa chỉ IP:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value"
                  type="text"
                  name="ipAddress"
                  value={formData.ipAddress}
                  placeholder="Nhập địa chỉ IP"
                  onChange={handleInputChange}
                />
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="passWord" className="form__label">
                  Mật khẩu:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value"
                  type="text"
                  name="passWord"
                  value={formData.passWord}
                  placeholder="Nhập mật khẩu"
                  onChange={handleInputChange}
                />
              </div>
              <span className="error__massage"></span>
            </span>
            <span className="form__add--1-col">
              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Dịch vụ sử dụng:
                  <span className="form__label--icon">*</span>
                </label>
                <TagDropDown
                  id=""
                  placeholder="Nhập dịch vụ sử dụng"
                  options={tagOptions}
                  onSelect={handleTagSelect}
                  selectedTags={selectedTags}
                />
              </div>
              <span className="error__massage"></span>
            </span>
            <div className="content__message">
              <span className="form__label--icon">*</span>
              Là trường thông tin bắt buộc
            </div>
          </div>
          <div className="btn__group">
            <Link to="/queueing-system/device/">
              <button className="btn form-cancel">Hủy bỏ</button>
            </Link>
            <button type="submit" className="btn form-submit">
              Thêm thiết bị
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Adddevice;
