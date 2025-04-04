import React, { useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import './style.css';

const CustomSelect = ({
  options,
  value,
  onChange = () => {},
  placeholder = 'Выберите вариант',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div className="custom-select__selected" onClick={toggleOpen}>
        {selectedOption ? selectedOption.label : placeholder || 'Выберите вариант'}
        <span className={`custom-select__arrow ${isOpen ? 'open' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="UiKitUiKitIcon_m UiKitImgIcon UiKitUiKitIcon_root UiKitImgIcon" role="img" aria-hidden="true">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M16.5 10 12 14.5 7.5 10"></path>
          </svg>
        </span>
      </div>
      {isOpen && (
        <ul className="custom-select__options">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`custom-select__option ${
                value === option.value ? 'selected' : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default CustomSelect;
