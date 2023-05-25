import React, { useState } from 'react';
import './dropdowntag.css';
import TagItem from './Tagitem';

interface TagDropDownProps {
  id: string;
  placeholder: string;
  options: string[];
  onSelect: (selectedOptions: string[]) => void;
}

const TagDropDown: React.FC<TagDropDownProps> = ({ placeholder, options, onSelect }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (!selectedTags.includes(option)) {
      setSelectedTags([...selectedTags, option]);
    }
    setIsOpen(false);
    onSelect(selectedTags);
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(item => item !== tag));
    onSelect(selectedTags.filter(item => item !== tag));
  };

  return (
    <div className={`tagDropDown ${isOpen ? 'open' : ''}`}>
      <div className="toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedTags.length > 0 ? (
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
