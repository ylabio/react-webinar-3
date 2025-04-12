import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {
  const {
    onChange,
    name,
    type = 'text',
    theme = '',
    placeholder,
    delay = 600,
    id,
    autoComplete = 'on',
  } = props;
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => onChange(value, name), delay),
    [onChange, name],
  );

  // Обработчик изменений в поле
  const onChangeHandler = event => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Input');
  return (
    <input
      className={cn({ theme: theme })}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChangeHandler}
      id={id}
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
  delay: PropTypes.number,
  id: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default memo(Input);
