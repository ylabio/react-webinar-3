import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function AuthInput(props) {
  const [value, setValue] = useState(props.value || '');

  const onChange = useCallback((e) => {
    const newValue = e.target.value;
    setValue(newValue);
    props.onChange(newValue);
  }, [props.onChange]);

  const cn = bem('AuthInput');
  return (
    <input
      className={cn()}
      value={value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  );
}

AuthInput.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

AuthInput.defaultProps = {
  type: 'text',
  value: '',
  placeholder: '',
};

export default memo(AuthInput);