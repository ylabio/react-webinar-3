import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CustomSelect({ options, value, onChange }) {
  const cn = bem('CustomSelect');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = options.find(opt => opt.value === value);

  return (
    <div className={cn()} ref={ref}>
      <div
        className={cn('button')}
        onClick={() => setOpen(!open)}
        data-open={open ? 'true' : 'false'}
      >
        {current?.title || 'Выбрать'}
      </div>
      {open && (
        <ul className={cn('list')}>
          {options.map(opt => (
            <li
              key={opt.value}
              className={cn('item', { selected: opt.value === value })}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {`${'- '.repeat(opt.level || 0)}${opt.title}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      level: PropTypes.number,
    }),
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;
