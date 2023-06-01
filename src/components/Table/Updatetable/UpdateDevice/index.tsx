import React, { useEffect, useState } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';
import DropDown from '../../../Dropdown';
import TagDropDown from '../../../Dropdowntag';
import { db } from '../../../../init/init-firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import '../../../../pages/base.css';
import '../../Addtable/addtable.css';
import '../../Addtable/Adddevice/adddevice.css';
import { Link, useLocation } from 'react-router-dom';

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

function UpdateDevice() {
  const location = useLocation();
  const row = location.state;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [initialDeviceType, setInitialDeviceType] = useState('');
  const [formData, setFormData] = useState<FormData>({
    deviceId: row.deviceId,
    deviceType: row.deviceType,
    deviceName: row.deviceName,
    userName: row.userName,
    ipAddress: row.ipAddress,
    passWord: row.passWord,
    serviceUse: row.serviceUse,
    connectStatus: true,
    activeStatus: true,
  });

  useEffect(() => {
    setInitialDeviceType(row.deviceType);
  }, [row.deviceType]);

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

  useEffect(() => {
    if (row.serviceUse) {
      setSelectedTags(row.serviceUse.split(', '));
    }
  }, [row.serviceUse]);

  const handleTagSelect = (selectedOptions: string[]) => {
    setSelectedTags(selectedOptions);
    setFormData(prevFormData => ({
      ...prevFormData,
      serviceUse: selectedOptions.join(', '),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { deviceId } = formData;

      // Tạo truy vấn để tìm document theo deviceName
      const q = query(collection(db, 'device'), where('deviceId', '==', deviceId));

      // Thực hiện truy vấn
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Lấy document đầu tiên tìm thấy
        const documentSnapshot = querySnapshot.docs[0];
        const documentRef = doc(db, 'device', documentSnapshot.id);

        // Cập nhật document
        await updateDoc(documentRef, {
          deviceName: formData.deviceName,
          userName: formData.userName,
          passWord: formData.passWord,
          ipAddress: formData.ipAddress,
          deviceType: formData.deviceType,
          serviceUse: formData.serviceUse,
        }); // Thay đổi thành giá trị mới cần cập nhật

        alert(`Cập nhật thành công cho ID: ${formData.deviceId}.`);
      } else {
        console.log('Không tìm thấy document với deviceId tương ứng.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật document:', error);
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
          <div className="header__title">Cập nhật thiết bị</div>
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
                <label htmlFor="deviceID" className="form__label">
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
                  disabled
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
                  initialDeviceType={formData.deviceType} // Truyền giá trị từ state formData.deviceType vào initialDeviceType
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
            <Link to="/device">
              <button className="btn form-cancel">Hủy bỏ</button>
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

export default UpdateDevice;
