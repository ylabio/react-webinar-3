import { memo } from 'react';
import PropTypes from 'prop-types';

function Select({ value = 10, onChange = e => {}, options }) {
  const onChangeHandler = e => {
    onChange(e);
  };

  return (
    <select value={value} onChange={onChangeHandler}>
      {options.map(item => (
        <option className="Select-option" key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      text: PropTypes.string,
    }),
  ).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default memo(Select);
