import React from 'react';
import './popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Số thứ tự được cấp</h2>
        <p className="popup-number">20001201</p>
        <p className="popup-service">
          DV: Khám răng hàm mặt<p className="popup-place">(tại quầy số 1)</p>
        </p>

        <button className="popup-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="popup-time">
        <p className="popup-time-start">Thời gian cấp: 10:39 19/10/2023</p>
        <p className="popup-time-end">Hạn sử dụng: 10:39 19/10/2023</p>
      </div>
    </div>
  );
};

export default Popup;
