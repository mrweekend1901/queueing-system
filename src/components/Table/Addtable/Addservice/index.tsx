import '../../../../pages/base.css';
import '../addtable.css';
import './addservice.css';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';
import { db } from '../../../../init/init-firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FormValues {
  serviceId: string;
  serviceName: string;
  serviceDetail: string;
  autoUpDown: boolean;
  prefix: boolean;
  surfix: boolean;
  resetDaily: boolean;
}

function Addservice() {
  const [formValues, setFormValues] = useState<FormValues>({
    serviceId: '',
    serviceName: '',
    serviceDetail: '',
    autoUpDown: false,
    prefix: false,
    surfix: false,
    resetDaily: false,
  });

  // Lấy dữ liệu input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    const fieldValue = type === 'checkbox' ? checked : value;

    setFormValues(prevFormValues => ({
      ...prevFormValues,
      [name]: fieldValue,
    }));
  };

  const handleAddService = async (event: React.FormEvent) => {
    event.preventDefault();

    // Truy cập các giá trị bằng đối tượng formValues
    const { serviceId, serviceName, serviceDetail, autoUpDown, prefix, surfix, resetDaily } =
      formValues;

    const serviceData = {
      serviceId,
      serviceName,
      serviceDetail,
      autoUpDown,
      prefix,
      surfix,
      resetDaily,
    };

    try {
      const docRef = await addDoc(collection(db, 'service'), serviceData);
      console.log('Document written with ID: ', docRef.id);

      // Reset form values
      setFormValues({
        serviceId: '',
        serviceName: '',
        serviceDetail: '',
        autoUpDown: false,
        prefix: false,
        surfix: false,
        resetDaily: false,
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  console.log(formValues);

  return (
    <div className="addservice__page add__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Dịch vụ</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__fa">Danh sách dịch vụ</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Thêm dịch vụ</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Quản lý dịch vụ</div>
        <form className="form__add" onSubmit={handleAddService}>
          <div className="content__body">
            <div className="content__label">Thông tin dịch vụ</div>
            <span className="content__group">
              <span className="form__add--2-col">
                <div className="form__group no-marbot">
                  <label htmlFor="serviceId" className="form__label">
                    Mã dịch vụ:
                    <span className="form__label--icon">*</span>
                  </label>
                  <input
                    value={formValues.serviceId}
                    id="serviceId"
                    name="serviceId"
                    className="form__value"
                    type="text"
                    placeholder="Nhập mã dịch vụ"
                    onChange={handleChange}
                  />
                </div>
                <span className="error__massage"></span>
                <div className="form__group">
                  <label htmlFor="serviceName" className="form__label">
                    Tên dịch vụ:
                    <span className="form__label--icon">*</span>
                  </label>
                  <input
                    value={formValues.serviceName}
                    id="serviceName"
                    name="serviceName"
                    className="form__value"
                    type="text"
                    placeholder="Nhập tên dịch vụ"
                    onChange={handleChange}
                  />
                </div>
                <span className="error__massage"></span>
              </span>
              <span className="form__add--2-col">
                <div className="form__group">
                  <label htmlFor="serviceDetail" className="form__label">
                    Mô tả:
                    <span className="form__label--icon">*</span>
                  </label>
                  <input
                    value={formValues.serviceDetail}
                    id="serviceDetail"
                    name="serviceDetail"
                    className="form__value form__value-service"
                    type="text"
                    placeholder="Nhập mô tả"
                    onChange={handleChange}
                  />
                </div>
                <span className="error__massage"></span>
              </span>
            </span>
            <div className="content__label">Quy tắc cấp số</div>
            <span className="content__group">
              <span className="form__add--1-col">
                <div className="form__group">
                  <input
                    id="autoUpDown"
                    name="autoUpDown"
                    className="checkbox__value"
                    type="checkbox"
                    checked={formValues.autoUpDown}
                    onChange={handleChange}
                  />
                  <span className="checkbox__text">Tăng tự động từ</span>
                  <input className="input__number" value="0001" type="text" disabled />
                  <span className="checkbox__text">đến</span>
                  <input className="input__number" value="9999" type="text" disabled />
                </div>
                <div className="form__group">
                  <input
                    id="prefix"
                    name="prefix"
                    className="checkbox__value"
                    type="checkbox"
                    checked={formValues.prefix}
                    onChange={handleChange}
                  />
                  <span className="checkbox__text">Prefix</span>
                  <input className="input__number" value="0001" type="text" disabled />
                </div>
                <div className="form__group">
                  <input
                    id="surfix"
                    name="surfix"
                    className="checkbox__value"
                    type="checkbox"
                    checked={formValues.surfix}
                    onChange={handleChange}
                  />
                  <span className="checkbox__text">Surfix</span>
                  <input className="input__number" value="0001" type="text" disabled />
                </div>
                <div className="form__group">
                  <input
                    id="resetDaily"
                    name="resetDaily"
                    className="checkbox__value"
                    type="checkbox"
                    checked={formValues.resetDaily}
                    onChange={handleChange}
                  />
                  <span className="checkbox__text">Reset mỗi ngày</span>
                </div>
              </span>
            </span>
            <div className="content__message">
              <span className="form__label--icon">*</span>
              Là trường thông tin bắt buộc
            </div>
          </div>
          <div className="btn__group">
            <Link to="/queueing-system/service/">
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

export default Addservice;
