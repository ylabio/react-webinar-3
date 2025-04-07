import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ItemsPerPage({ value, onChange, translations }) {
  const options = [5, 10, 20];

  return (
    <div className="ItemsPerPage">
      <label htmlFor="itemsPerPage">{translations.elementSelect}</label>
      <select id="itemsPerPage" value={value} onChange={e => onChange(Number(e.target.value))}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

ItemsPerPage.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(ItemsPerPage);
