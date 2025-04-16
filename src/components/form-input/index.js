import { memo } from 'react';
import './style.css';
import PropTypes from 'prop-types';

const FormInput = ({ name, type, label, placeholder, value, onChange }) => {
  return (
    <div className="FormInput">
      <label htmlFor={name}>{label}</label>
      <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default memo(FormInput);

FormInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
