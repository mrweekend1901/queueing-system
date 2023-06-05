import React, { useState } from 'react';
import { faAngleRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';
import DropDown from '../../../Dropdown';
import { db } from '../../../../init/init-firebase';
import { collection, addDoc } from 'firebase/firestore';

import '../../../../pages/base.css';
import '../addtable.css';
import './adduser.css';
import { Link } from 'react-router-dom';

const dropdownList = ['Kiosk', 'Display counter'];

interface FormData {
  deviceID: string;
  deviceType: string;
  deviceName: string;
  userName: string;
  addressIP: string;
  passWord: string;
  serviceUse: string;
  connectStatus: boolean;
  activeStatus: boolean;
}

function AddUser() {
  const [showPass, setShowPass] = useState(false);
  const inputType = showPass ? 'text' : 'password';
  const [formData, setFormData] = useState<FormData>({
    deviceID: '',
    deviceType: '',
    deviceName: '',
    userName: '',
    addressIP: '',
    passWord: '',
    serviceUse: '',
    connectStatus: true,
    activeStatus: true,
  });

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'device'), formData);
      console.log('Device added with ID: ', docRef.id);
      // Reset form data
      setFormData({
        deviceID: '',
        deviceType: '',
        deviceName: '',
        userName: '',
        addressIP: '',
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
    <div className="adduser__page add__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Cài đặt hệ thống</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__fa">Quản lý tài khoản</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Thêm tài khoản</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Quản lý tài khoản</div>
        <form className="form__add" onSubmit={handleSubmit}>
          <div className="content__body">
            <div className="content__label">Thông tài khoản</div>
            <span className="form__add--2-col">
              <div className="form__group">
                <label htmlFor="deviceID" className="form__label">
                  Họ tên:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value"
                  type="text"
                  name="passWord"
                  value={formData.passWord}
                  placeholder="Nhập họ tên"
                  onChange={handleInputChange}
                />
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Tên đăng nhập:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value"
                  type="text"
                  name="passWord"
                  value={formData.passWord}
                  placeholder="Nhập tên đăng nhập"
                  onChange={handleInputChange}
                />
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="deviceName" className="form__label">
                  Số điện thoại:
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
                  Mật khẩu:
                  <span className="form__label--icon">*</span>
                </label>
                <div className="password-container">
                  <input
                    className="form__value form__value--pass"
                    id="password"
                    name="password"
                    type={inputType}
                    placeholder="Nhập mật khẩu..."
                  />
                  <FontAwesomeIcon
                    className="eyes-icon"
                    icon={showPass ? faEye : faEyeSlash}
                    onClick={toggleShowPass}
                  />
                </div>
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="addressIP" className="form__label">
                  Email:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value"
                  type="text"
                  name="addressIP"
                  value={formData.addressIP}
                  placeholder="Nhập Email"
                  onChange={handleInputChange}
                />
              </div>
              <span className="error__massage"></span>

              <div className="form__group">
                <label htmlFor="passWord" className="form__label">
                  Nhập lại mật khẩu:
                  <span className="form__label--icon">*</span>
                </label>
                <div className="password-container">
                  <input
                    className="form__value form__value--pass"
                    id="password"
                    name="password"
                    type={inputType}
                    placeholder="Nhập mật khẩu..."
                  />
                  <FontAwesomeIcon
                    className="eyes-icon"
                    icon={showPass ? faEye : faEyeSlash}
                    onClick={toggleShowPass}
                  />
                </div>
              </div>
              <div className="form__group">
                <label htmlFor="passWord" className="form__label">
                  Vai trò:
                  <span className="form__label--icon">*</span>
                </label>
                <DropDown
                  id=""
                  placeholder="Chọn vai trò"
                  dropdownWidth="540px"
                  dropdownHeight="44px"
                  options={dropdownList}
                  onSelect={handleDropdownSelect}
                />
              </div>
              <div className="form__group">
                <label htmlFor="passWord" className="form__label">
                  Tình trạng:
                  <span className="form__label--icon">*</span>
                </label>
                <DropDown
                  id=""
                  placeholder="Chọn tình trạng"
                  dropdownWidth="540px"
                  dropdownHeight="44px"
                  options={dropdownList}
                  onSelect={handleDropdownSelect}
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
            <Link to="/device">
              <button className="btn form-cancel" style={{ background: '#FFF2E7' }}>
                Hủy bỏ
              </button>
            </Link>
            <button type="submit" className="btn form-submit">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
