import React, { useEffect, useState } from 'react';
import './dropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

interface DropDownProps {
  id: string;
  placeholder: string;
  dropdownWidth: string;
  dropdownHeight: string;
  initialDeviceType?: string; // Thay đổi kiểu dữ liệu thành string | undefined
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  placeholder,
  dropdownWidth,
  dropdownHeight,
  options,
  initialDeviceType, // Thêm dấu ? để đánh dấu là có thể truyền hoặc không truyền
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined); // Thay đổi kiểu dữ liệu của selectedOption

  useEffect(() => {
    if (initialDeviceType) {
      setSelectedOption(initialDeviceType);
    } else {
      setSelectedOption(placeholder);
    }
  }, [initialDeviceType, placeholder]);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-wrapper">
      <div
        className={`dropdown-toggle ${isOpen ? 'drop-active' : ''}`}
        onClick={handleDropdownToggle}
        style={{ width: dropdownWidth, height: dropdownHeight }}
      >
        {selectedOption || placeholder} {/* Sử dụng selectedOption hoặc placeholder */}
        <FontAwesomeIcon className="dropdown-icon" icon={isOpen ? faCaretUp : faCaretDown} />
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              style={{ width: dropdownWidth }}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
