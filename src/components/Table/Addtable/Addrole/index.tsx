import React, { useState } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';
import { db } from '../../../../init/init-firebase';
import { collection, addDoc } from 'firebase/firestore';

import '../../../../pages/base.css';
import '../addtable.css';
import './addrole.css';
import { Link } from 'react-router-dom';

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

function Addrole() {
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
    <div className="addrole__page add__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Cài đặt hệ thống</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__fa">Quản lý vai trò</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Thêm vai trò</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Danh sách vai trò</div>
        <form className="form__add" onSubmit={handleSubmit}>
          <div className="content__body">
            <div className="content__label">Thông tin vai trò</div>
            <div className="content__value">
              <div className="content__value--50">
                <div className="form__group">
                  <label htmlFor="" className="form__label">
                    Tên vai trò
                    <span className="form__label--icon">*</span>
                  </label>
                  <input type="text" className="form__value" placeholder="Nhập tên vai trò" />
                </div>
                <div className="form__group">
                  <label htmlFor="" className="form__label">
                    Mô tả
                  </label>
                  <input
                    style={{ height: '160px' }}
                    type="text"
                    className="form__value"
                    placeholder="Nhập mô tả"
                  />
                </div>

                <div className="content__message">
                  <span className="form__label--icon">*</span>
                  Là trường thông tin bắt buộc
                </div>
              </div>
              <div className="content__value--50">
                <label className="form__label">
                  Phân quyền chức năng
                  <span className="form__label--icon">*</span>
                </label>
                <div className="form__checkbox">
                  <ul className="checkbox__list">
                    <label htmlFor="" className="checkbox__label">
                      Nhóm chức năng A
                    </label>
                    <li className="checkbox__item">
                      <input type="checkbox" />
                      <p className="checkbox__text">Tất cả</p>
                    </li>
                    <li className="checkbox__item">
                      <input type="checkbox" />
                      <p className="checkbox__text">Chức năng X</p>
                    </li>
                    <li className="checkbox__item">
                      <input type="checkbox" />
                      <p className="checkbox__text">Chức năng Y</p>
                    </li>
                    <li className="checkbox__item">
                      <input type="checkbox" />
                      <p className="checkbox__text">Chức năng Z</p>
                    </li>
                  </ul>
                  <ul className="checkbox__list">
                    <label htmlFor="" className="checkbox__label">
                      Nhóm chức năng B
                    </label>
                    <li className="checkbox__item">
                      <input type="checkbox" />
                      <p className="checkbox__text">Tất cả</p>
                    </li>
                    <li className="checkbox__item">
                      <input type="checkbox" />
                      <p className="checkbox__text">Chức năng X</p>
                    </li>
                    <li className="checkbox__item">
                      <input type="checkbox" />
                      <p className="checkbox__text">Chức năng Y</p>
                    </li>
                    <li className="checkbox__item">
                      <input type="checkbox" />
                      <p className="checkbox__text">Chức năng Z</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="btn__group">
            <Link to="/setting/settingrole">
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

export default Addrole;
