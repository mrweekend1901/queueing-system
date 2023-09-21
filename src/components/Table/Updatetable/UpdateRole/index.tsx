import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import UserSide from '../../../UserSide';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../../init/init-firebase';

interface FormData {
  roleID: string;
  roleName: string;
  roleDesc: string;
  functionalgroupA: string[];
  functionalgroupB: string[];
}

function UpdateRole() {
  const location = useLocation();
  const row = location.state;

  const [formValues, setFormValues] = useState<FormData>({
    roleID: row.roleID,
    roleName: row.roleName,
    roleDesc: row.roleDesc,
    functionalgroupA: row.functionalgroupA.split(',').map((item: any) => item.trim()),
    functionalgroupB: row.functionalgroupB.split(',').map((item: any) => item.trim()),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      const checkboxValue = value;
      const checkboxName = name;
      const functionalGroup = checkboxName.startsWith('functionalgroupA')
        ? 'functionalgroupA'
        : 'functionalgroupB';

      if (checked) {
        setFormValues(prevFormValues => ({
          ...prevFormValues,
          [functionalGroup]: [...prevFormValues[functionalGroup], checkboxValue],
        }));
      } else {
        setFormValues(prevFormValues => ({
          ...prevFormValues,
          [functionalGroup]: prevFormValues[functionalGroup].filter(item => item !== checkboxValue),
        }));
      }
    } else {
      setFormValues(prevFormValues => ({
        ...prevFormValues,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (row) {
      // Chọn các checkbox dựa trên row.functionalgroupA
      const functionalgroupA = document.querySelectorAll<HTMLInputElement>(
        'input[name="functionalgroupA"]',
      );
      functionalgroupA.forEach(checkbox => {
        if (row.functionalgroupA.includes(checkbox.value)) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      });

      // Chọn các checkbox dựa trên row.functionalgroupB
      const functionalgroupB = document.querySelectorAll<HTMLInputElement>(
        'input[name="functionalgroupB"]',
      );
      functionalgroupB.forEach(checkbox => {
        if (row.functionalgroupB.includes(checkbox.value)) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      });
    }
  }, [row]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { roleID } = formValues;

      // Tạo truy vấn để tìm document theo deviceName
      const q = query(collection(db, 'settingrole'), where('roleID', '==', roleID));

      // Thực hiện truy vấn
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Lấy document đầu tiên tìm thấy
        const documentSnapshot = querySnapshot.docs[0];
        const documentRef = doc(db, 'settingrole', documentSnapshot.id);

        // Cập nhật document
        await updateDoc(documentRef, {
          roleName: formValues.roleName,
          roleDesc: formValues.roleDesc,
          functionalgroupA: formValues.functionalgroupA.join(', '),
          functionalgroupB: formValues.functionalgroupB.join(', '),
        }); // Thay đổi thành giá trị mới cần cập nhật

        alert(`Cập nhật thành công cho ID: ${formValues.roleID}.`);
      } else {
        console.log('Không tìm thấy document với RoleID tương ứng.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật document:', error);
    }
  };

  console.log(formValues);

  return (
    <div className="addrole__page add__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Cài đặt hệ thống</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__fa">Quản lý vai trò</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Cập nhật vai trò</div>
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
                  <label htmlFor="roleName" className="form__label">
                    Tên vai trò
                    <span className="form__label--icon">*</span>
                  </label>
                  <input
                    value={formValues.roleName}
                    name="roleName"
                    type="text"
                    className="form__value"
                    placeholder="Nhập tên vai trò"
                    onChange={handleChange}
                  />
                </div>
                <div className="form__group">
                  <label htmlFor="roleDesc" className="form__label">
                    Mô tả
                  </label>
                  <input
                    value={formValues.roleDesc}
                    name="roleDesc"
                    style={{ height: '160px' }}
                    type="text"
                    className="form__value"
                    placeholder="Nhập mô tả"
                    onChange={handleChange}
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
                  <ul id="functionalgroupA" className="checkbox__list">
                    <label htmlFor="" className="checkbox__label">
                      Nhóm chức năng A
                    </label>
                    <li className="checkbox__item">
                      <input
                        name="functionalgroupA"
                        value="Tất cả"
                        type="checkbox"
                        onChange={handleChange}
                      />
                      <p className="checkbox__text">Tất cả</p>
                    </li>
                    <li className="checkbox__item">
                      <input
                        name="functionalgroupA"
                        value="Chức năng X"
                        type="checkbox"
                        onChange={handleChange}
                      />
                      <p className="checkbox__text">Chức năng X</p>
                    </li>
                    <li className="checkbox__item">
                      <input
                        name="functionalgroupA"
                        value="Chức năng Y"
                        type="checkbox"
                        onChange={handleChange}
                      />
                      <p className="checkbox__text">Chức năng Y</p>
                    </li>
                    <li className="checkbox__item">
                      <input
                        name="functionalgroupA"
                        value="Chức năng Z"
                        type="checkbox"
                        onChange={handleChange}
                      />
                      <p className="checkbox__text">Chức năng Z</p>
                    </li>
                  </ul>
                  <ul id="functionalgroupB" className="checkbox__list">
                    <label htmlFor="" className="checkbox__label">
                      Nhóm chức năng B
                    </label>
                    <li className="checkbox__item">
                      <input
                        name="functionalgroupB"
                        value="Tất cả"
                        type="checkbox"
                        onChange={handleChange}
                      />
                      <p className="checkbox__text">Tất cả</p>
                    </li>
                    <li className="checkbox__item">
                      <input
                        name="functionalgroupB"
                        value="Chức năng X"
                        type="checkbox"
                        onChange={handleChange}
                      />
                      <p className="checkbox__text">Chức năng X</p>
                    </li>
                    <li className="checkbox__item">
                      <input
                        name="functionalgroupB"
                        value="Chức năng Y"
                        type="checkbox"
                        onChange={handleChange}
                      />
                      <p className="checkbox__text">Chức năng Y</p>
                    </li>
                    <li className="checkbox__item">
                      <input
                        name="functionalgroupB"
                        value="Chức năng Z"
                        type="checkbox"
                        onChange={handleChange}
                      />
                      <p className="checkbox__text">Chức năng Z</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="btn__group">
            <Link to="/queueing-system/setting/settingrole">
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

export default UpdateRole;
