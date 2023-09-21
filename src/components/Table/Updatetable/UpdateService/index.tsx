import '../../../../pages/base.css';
import '../../Addtable/addtable.css';
import '../../Addtable/Addservice/addservice.css';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';
import { db } from '../../../../init/init-firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface FormValues {
  serviceId: string;
  serviceName: string;
  serviceDesc: string;
  autoUpDown: boolean;
  prefix: boolean;
  prefixValue: string;
  surfix: boolean;
  surfixValue: string;
  resetDaily: boolean;
}

function UpdateService() {
  const location = useLocation();
  const row = location.state;

  const [formValues, setFormValues] = useState<FormValues>({
    serviceId: row.serviceId,
    serviceName: row.serviceName,
    serviceDesc: row.serviceDesc,
    autoUpDown: row.autoUpDown,
    prefix: row.prefix,
    prefixValue: row.prefixValue,
    surfix: row.surfix,
    surfixValue: row.surfixValue,
    resetDaily: row.resetDaily,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { serviceId } = formValues;

      // Tạo truy vấn để tìm document theo deviceName
      const q = query(collection(db, 'service'), where('serviceId', '==', serviceId));

      // Thực hiện truy vấn
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Lấy document đầu tiên tìm thấy
        const documentSnapshot = querySnapshot.docs[0];
        const documentRef = doc(db, 'service', documentSnapshot.id);

        // Cập nhật document
        await updateDoc(documentRef, {
          serviceName: formValues.serviceName,
          serviceDesc: formValues.serviceDesc,
          autoUpDown: formValues.autoUpDown,
          prefix: formValues.prefix,
          surfix: formValues.surfix,
          resetDaily: formValues.resetDaily,
        }); // Thay đổi thành giá trị mới cần cập nhật

        alert(`Cập nhật thành công cho ID: ${formValues.serviceId}.`);
      } else {
        console.log('Không tìm thấy document với deviceId tương ứng.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật document:', error);
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
        <form className="form__add" onSubmit={handleSubmit}>
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
                    disabled
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
                  <label htmlFor="serviceDesc" className="form__label">
                    Mô tả:
                    <span className="form__label--icon">*</span>
                  </label>
                  <input
                    value={formValues.serviceDesc}
                    id="serviceDesc"
                    name="serviceDesc"
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
                  <input
                    className="input__number"
                    value={formValues.prefixValue}
                    type="text"
                    disabled
                  />
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
                  <input
                    className="input__number"
                    value={formValues.surfixValue}
                    type="text"
                    disabled
                  />
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
            <Link to="/queueing-system/service">
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

export default UpdateService;
