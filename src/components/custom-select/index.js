import { memo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CustomSelect({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const cn = bem('CustomSelect');

  const toggleOpen = () => setIsOpen(prev => !prev);
  const handleSelect = option => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn({ open: isOpen })} ref={ref}>
      <div className={cn('selected')} onClick={toggleOpen}>
        {value}
        <span className={cn('arrow')}>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <ul className={cn('options')}>
          {options.map(option => (
            <li
              key={option}
              className={`${cn('option')} ${option === value ? 'active' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

CustomSelect.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default memo(CustomSelect);
