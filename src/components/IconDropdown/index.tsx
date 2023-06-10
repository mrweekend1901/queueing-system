import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import './icondropdown.css';

interface DropDownProps {
  id: string;
  dropdownWidth: string;
  dropdownHeight: string;
  initialDeviceType?: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const IconDropDown: React.FC<DropDownProps> = ({
  dropdownWidth,
  dropdownHeight,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined); // Thay đổi kiểu dữ liệu của selectedOption

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
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
        <div className="dropdown-options">
          {options.map((option, index) => (
            <div key={index} className="dropdown-option" onClick={() => handleOptionSelect(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IconDropDown;
