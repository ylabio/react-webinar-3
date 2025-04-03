import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Select({ changeLanguage = () => {}, value }) {
  const onSelect = e => {
    changeLanguage(e.target.value);
  };

  return (
    <select className="Select" value={value} onChange={onSelect}>
      <option key="ru" value="ru">
        RU
      </option>
      <option key="en" value="en">
        EN
      </option>
    </select>
  );
}

Select.propTypes = {
  changeLanguage: PropTypes.func,
  value: PropTypes.string,
};

export default memo(Select);
