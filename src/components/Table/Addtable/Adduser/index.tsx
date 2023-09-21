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

const dropdownList = ['Hoạt động', 'Ngưng hoạt động'];
const dropdownList2 = ['Admin', 'Kế toán', 'Lễ tân', 'Bác sĩ'];

interface FormData {
  email: string;
  fullName: string;
  username: string;
  phoneNumber: string;
  passWord: string;
  rePassWord: string;
  role: string;
  activeStatus: boolean;
}

function AddUser() {
  const [showPass, setShowPass] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);

  const inputType = showPass ? 'text' : 'password';
  const [formData, setFormData] = useState<FormData>({
    email: '',
    fullName: '',
    username: '',
    phoneNumber: '',
    passWord: '',
    rePassWord: '',
    role: '',
    activeStatus: false,
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

    if (name === 'rePassWord' && value !== formData.passWord) {
      setRePasswordError(true);
    } else {
      setRePasswordError(false);
    }
  };

  const handleDropdownSelectRole = (selectedOption: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      role: selectedOption,
    }));
  };

  const handleDropdownSelectAction = (selectedOption: string) => {
    let isActive: boolean;
    if (selectedOption === 'Hoạt động') {
      isActive = true;
    } else if (selectedOption === 'Ngưng hoạt động') {
      isActive = false;
    } else {
      // Giá trị không hợp lệ
      return;
    }
    setFormData(prevFormData => ({
      ...prevFormData,
      activeStatus: isActive,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { passWord, rePassWord } = formData;

    if (passWord !== rePassWord || passWord === '' || rePassWord === '') {
      setRePasswordError(true);
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        email: formData.email,
        fullName: formData.fullName,
        username: formData.username,
        phoneNumber: formData.phoneNumber,
        passWord: formData.passWord,
        role: formData.role,
        activeStatus: formData.activeStatus,
      });
      console.log('User added with ID: ', docRef.id);
      // Reset form data
      setFormData({
        email: '',
        fullName: '',
        username: '',
        phoneNumber: '',
        passWord: '',
        rePassWord: '',
        role: '',
        activeStatus: false,
      });
    } catch (error) {
      console.error('Error adding device: ', error);
    }
  };

  console.log(formData);

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
                <label htmlFor="fullName" className="form__label">
                  Họ tên:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  placeholder="Nhập họ tên"
                  onChange={handleInputChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="username" className="form__label">
                  Tên đăng nhập:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value"
                  type="text"
                  name="username"
                  value={formData.username}
                  placeholder="Nhập tên đăng nhập"
                  onChange={handleInputChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="phoneNumber" className="form__label">
                  Số điện thoại:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  placeholder="Nhập tên thiết bị"
                  onChange={handleInputChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="passWord" className="form__label">
                  Mật khẩu:
                  <span className="form__label--icon">*</span>
                </label>
                <div className="password-container">
                  <input
                    className="form__value form__value--pass"
                    value={formData.passWord}
                    name="passWord"
                    type={inputType}
                    placeholder="Nhập mật khẩu..."
                    onChange={handleInputChange}
                  />
                  <FontAwesomeIcon
                    className="eyes-icon"
                    icon={showPass ? faEye : faEyeSlash}
                    onClick={toggleShowPass}
                  />
                </div>
              </div>

              <div className="form__group">
                <label htmlFor="email" className="form__label">
                  Email:
                  <span className="form__label--icon">*</span>
                </label>
                <input
                  className="form__value"
                  type="text"
                  name="email"
                  value={formData.email}
                  placeholder="Nhập Email"
                  onChange={handleInputChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="rePassWord" className="form__label">
                  Nhập lại mật khẩu:
                  <span className="form__label--icon">*</span>
                </label>
                <div className="password-container">
                  <input
                    className={`form__value ${rePasswordError ? 'error-input' : ''}`}
                    id="rePassWord"
                    name="rePassWord"
                    value={formData.rePassWord}
                    type={inputType}
                    placeholder="Nhập mật khẩu..."
                    onChange={handleInputChange}
                  />
                  <FontAwesomeIcon
                    className="eyes-icon"
                    icon={showPass ? faEye : faEyeSlash}
                    onClick={toggleShowPass}
                  />
                </div>
              </div>
              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Vai trò:
                  <span className="form__label--icon">*</span>
                </label>
                <DropDown
                  id=""
                  placeholder="Chọn vai trò"
                  dropdownWidth="540px"
                  dropdownHeight="44px"
                  options={dropdownList2}
                  onSelect={handleDropdownSelectRole}
                />
              </div>
              <div className="form__group">
                <label htmlFor="" className="form__label">
                  Tình trạng:
                  <span className="form__label--icon">*</span>
                </label>
                <DropDown
                  id=""
                  placeholder="Chọn tình trạng"
                  dropdownWidth="540px"
                  dropdownHeight="44px"
                  options={dropdownList}
                  onSelect={handleDropdownSelectAction}
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
            <Link to="/queueing-system/setting/settinguser">
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
