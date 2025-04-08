import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function SelectLimit({ changeLimit, options, texts, defaultValue }) {
  const cn = bem('Limit');

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    changeLimit(+selectedValue);
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{texts}</div>
      <select 
        className={cn('select')} 
        onChange={handleChange} 
        defaultValue={defaultValue}
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

SelectLimit.propTypes = {
  changeLimit: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  texts: PropTypes.string.isRequired,
  defaultValue: PropTypes.number,
};

export default memo(SelectLimit);
