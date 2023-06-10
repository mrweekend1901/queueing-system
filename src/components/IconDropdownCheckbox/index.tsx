import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import './icondropdowncheckbox.css';

interface DropDownProps {
  id: string;
  dropdownWidth: string;
  dropdownHeight: string;
  initialDeviceType?: string;
  options: string[];
  onSelect: (selectedOptions: string[]) => void;
}

const IconDropDownCheckbox: React.FC<DropDownProps> = ({
  dropdownWidth,
  dropdownHeight,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    let updatedOptions: string[];

    if (isSelected) {
      // Nếu option đã được chọn, xóa khỏi mảng selectedOptions
      updatedOptions = selectedOptions.filter(selectedOption => selectedOption !== option);
    } else {
      // Nếu option chưa được chọn, thêm vào mảng selectedOptions
      updatedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(updatedOptions); // Cập nhật giá trị selectedOptions
    onSelect(updatedOptions); // Gọi onSelect với danh sách option được cập nhật
  };

  return (
    <div className="dropdown-wrapper dropdown-wrapper--icon">
      <div
        className="dropdown-toggle"
        onClick={handleDropdownToggle}
        style={{ width: dropdownWidth, height: dropdownHeight }}
      >
        <FontAwesomeIcon icon={faSort} />
      </div>
      {isOpen && (
        <div className="dropdown-options-checkbox">
          {options.map((option, index) => (
            <span className="dropdown-group" key={index}>
              {option}
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionSelect(option)}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default IconDropDownCheckbox;
