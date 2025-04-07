import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { STRINGS, DEFAULT_LIMIT } from '../../const';
import { useAppContext } from '../../app-context';
import './style.css';

function SelectLimit({ changeLimit, options, texts, defaultValue = DEFAULT_LIMIT }) {
  const cn = bem('Limit');
  const { language } = useAppContext();

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
  defaultValue: PropTypes.number,
};

export default memo(SelectLimit);
