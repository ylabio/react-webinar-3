import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

const PageSizeSelect = ({ limit, onChangeLimit, onChangePage }) => {
  const cn = bem('Page-Size-Select');

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const pageSizeOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
  ];

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (value, e) => {
    e.stopPropagation();
    setIsOpen(false);
    requestAnimationFrame(() => {
      if (value !== limit) {
        onChangeLimit(value);
        onChangePage(1);
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel = pageSizeOptions.find(opt => opt.value === limit)?.label;

  return (
    <div className={cn()} ref={selectRef}>
      <span>Показывать по: </span>
      <div
        className={cn('custom-select')}
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={e => e.key === 'Enter' && toggleDropdown()}
      >
        <div className={cn('selected')}>
          {currentLabel} <span className={cn('arrow')}>▾</span>
        </div>
        {isOpen && (
          <ul className={cn('options')}>
            {pageSizeOptions.map(option => (
              <li
                key={option.value}
                className={`${cn('option')}${option.value === limit ? ' selected' : ''}`}
                onClick={e => handleSelect(option.value, e)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

PageSizeSelect.propTypes = {
  limit: PropTypes.number.isRequired,
  onChangeLimit: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default PageSizeSelect;
