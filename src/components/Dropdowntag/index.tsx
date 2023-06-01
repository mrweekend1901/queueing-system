import React, { useEffect, useState } from 'react';
import './dropdowntag.css';
import TagItem from './Tagitem';

interface TagDropDownProps {
  id: string;
  placeholder: string;
  options: string[];
  onSelect: (selectedOptions: string[]) => void;
  selectedTags?: string[];
}

const TagDropDown: React.FC<TagDropDownProps> = ({
  placeholder,
  options,
  onSelect,
  selectedTags,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (selectedTags && selectedTags.length > 0) {
      setSelectedOption('');
    }
  }, [selectedTags]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    const updatedTags = selectedTags ? [...selectedTags] : [];
    if (!updatedTags.includes(option)) {
      updatedTags.push(option);
    }
    onSelect(updatedTags);
  };

  const handleTagRemove = (tag: string) => {
    if (selectedTags) {
      const updatedTags = selectedTags.filter(item => item !== tag);
      onSelect(updatedTags);
    }
  };

  return (
    <div className={`tagDropDown ${isOpen ? 'open' : ''}`}>
      <div className="toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedTags && selectedTags.length > 0 ? (
          <div className="tagContainer">
            {selectedTags.map(tag => (
              <TagItem key={tag} value={tag} onRemove={() => handleTagRemove(tag)} />
            ))}
          </div>
        ) : (
          <span className={`placeholder ${selectedOption ? 'selected' : ''}`}>
            {selectedOption || placeholder}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="options">
          {options.map((option, index) => (
            <div key={index} className="option" onClick={() => handleOptionSelect(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagDropDown;
