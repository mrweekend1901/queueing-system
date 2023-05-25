import React, { useState } from 'react';
import './dropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

interface DropDownProps {
  id: string;
  placeholder: string;
  dropdownWidth: string;
  dropdownHeight: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  placeholder,
  dropdownWidth,
  dropdownHeight,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);
  const [isIconRotated, setIsIconRotated] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
    setIsIconRotated(!isIconRotated);
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
        {selectedOption}
        <FontAwesomeIcon className="dropdown-icon" icon={isIconRotated ? faCaretUp : faCaretDown} />
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              style={{ width: dropdownWidth }}
              onClick={() => {
                setIsIconRotated(false);
                handleOptionSelect(option);
              }}
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
