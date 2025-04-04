import { memo } from 'react';
import PropTypes from 'prop-types';

function Select({ value = 10, onChange = e => {}, options }) {
  const onChangeHandler = e => {
    onChange(e);
  };

  return (
    <select value={value} onChange={onChangeHandler}>
      {options.map(item => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      text: PropTypes.string,
    }),
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default memo(Select);
