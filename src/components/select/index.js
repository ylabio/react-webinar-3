// Select.js
import { memo } from 'react';
import PropTypes from 'prop-types';
import CustomSelect from '../custom-select';
import './style.css';

function Select(props) {
  const { onChange = () => {}, options, value, placeholder } = props;
  
  return (
    <CustomSelect 
      options={options} 
      value={value} 
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default memo(Select);
