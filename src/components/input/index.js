import { memo, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Input({
  value,
  name,
  type = 'text',
  placeholder,
  onChange = () => {},
  theme = '',
  disabled = false,
  required = false,
  autoComplete,
}) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = event => {
    setInputValue(event.target.value);
    onChange(event.target.value, name);
  };

  useLayoutEffect(() => setInputValue(value), [value]);

  const cn = bem('Input');

  return (
    <input
      className={cn({ theme })}
      value={inputValue}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default memo(Input);
