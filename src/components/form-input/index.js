import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FormInput({ item }) {
  const cn = bem('FormInput');

  const handleChange = (e) => {
    item.onChange(e.target.value);
  };

  return (
    <div className={cn()}>
      <label>{item.label}</label>
      <div>
        <input name={item.name} type={item.type} value={item.value} onChange={handleChange} />
      </div>
    </div>
  );
}

FormInput.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'password']).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

FormInput.defaultProps = {
  item: {
    onChange: () => {},
  },
};

export default React.memo(FormInput);
