import React, { useState, useEffect } from 'react';
import { faAngleRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';
import DropDown from '../../../Dropdown';
import { db } from '../../../../init/init-firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

import { Link, useLocation } from 'react-router-dom';

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

function UpdateUser() {
  const location = useLocation();
  const row = location.state;

  const [showPass, setShowPass] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);

  const [initialRole, setInitialRole] = useState('');
  const [initialAction, setInitialAction] = useState('');

  const inputType = showPass ? 'text' : 'password';
  const [formData, setFormData] = useState<FormData>({
    email: row.email,
    fullName: row.fullName,
    username: row.username,
    phoneNumber: row.phoneNumber,
    passWord: row.passWord,
    rePassWord: row.passWord,
    role: row.role,
    activeStatus: row.activeStatus,
  });

  useEffect(() => {
    setInitialRole(row.role);
  }, [row.role]);

  useEffect(() => {
    if (row.activeStatus === true) {
      setInitialAction('Hoạt động');
    } else {
      setInitialAction('Ngưng hoạt động');
    }
  }, [row.activeStatus]);

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
      const { username } = formData;

      // Tạo truy vấn để tìm document theo deviceName
      const q = query(collection(db, 'users'), where('username', '==', username));

      // Thực hiện truy vấn
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Lấy document đầu tiên tìm thấy
        const documentSnapshot = querySnapshot.docs[0];
        const documentRef = doc(db, 'users', documentSnapshot.id);

        // Cập nhật document
        await updateDoc(documentRef, {
          email: formData.email,
          passWord: formData.passWord,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          activeStatus: formData.activeStatus,
        }); // Thay đổi thành giá trị mới cần cập nhật

        alert(`Cập nhật thành công cho ID: ${formData.username}.`);
      } else {
        console.log('Không tìm thấy document với RoleID tương ứng.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật document:', error);
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
                  disabled
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
                  initialDeviceType={initialRole}
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
                  initialDeviceType={initialAction}
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
            <Link to="/setting/settinguser">
              <button className="btn form-cancel" style={{ background: '#FFF2E7' }}>
                Hủy bỏ
              </button>
            </Link>
            <button type="submit" className="btn form-submit">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
