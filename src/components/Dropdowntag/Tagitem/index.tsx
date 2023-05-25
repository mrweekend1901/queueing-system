import React from 'react';
import './Tagitem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface TagItemProps {
  value: string;
  onRemove: () => void;
}

const TagItem: React.FC<TagItemProps> = ({ value, onRemove }) => {
  return (
    <div className="tagItem">
      <span className="tagItem-space">
        <span>{value}</span>
        <button className="removeButton" onClick={onRemove}>
          <FontAwesomeIcon className="removeButton-icon" icon={faXmark} />
        </button>
      </span>
    </div>
  );
};

export default TagItem;
