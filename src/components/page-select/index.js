import React, { useState } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';

const PageSelect = ({ current, onSizeChange }) => {
  const [selectedValue, setSelectedValue] = useState(current);
  const options = [5, 10, 20];

  const cn = bem('Custom');

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setSelectedValue(newValue);
    if (onSizeChange) {
      onSizeChange(newValue);
    }
  };

  return (
    <div className={cn('wrapper')}>
      <select
        value={selectedValue}
        onChange={handleChange}
        className={cn('select')}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option} страниц
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSelect;
