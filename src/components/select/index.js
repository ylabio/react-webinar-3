import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Select({ changeSelect = () => {}, value, propSelect = [] }) {
  const onSelect = e => {
    changeSelect(e.target.value);
  };

  return (
    <select className="Select" value={value} onChange={onSelect}>
      {propSelect.map(item => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  changeSelect: PropTypes.func,
  value: PropTypes.number,
};

export default memo(Select);
