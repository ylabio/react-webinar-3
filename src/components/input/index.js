import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {

  const {
    value,
    name,
    type= 'text',
    placeholder,
    onChange =() => {},
    theme='',
  } = props;





  // Внутренний стейт для быстрого отображения ввода
  const [localValue, setLocalValue] = useState(value);

  const onChangeDebounce = useCallback(
    debounce(val => props.onChange(val, props.name), 600),
    [onChange, name],
  );

  // Обработчик изменений в поле
  const onInputChange = event => {
    setLocalValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setLocalValue(value), [value]);

  const cn = bem('Input');
  return (
    <input
      className={cn({ theme: theme })}
      value={localValue}
      type={type}
      placeholder={placeholder}
      onChange={onInputChange}
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
};

export default memo(Input);
