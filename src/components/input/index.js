import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';
import './style.css';

function Input( {
  value = '',
  name = '',
  type = 'text',
  placeholder = '',
  onChange = () => {},
  theme = '',
  inputRef,
} ) {
  // Внутренний стейт для быстрого отображения ввода
  const [inputValue, setInputValue] = useState(value);

  const onChangeDebounce = useCallback(
    debounce(value => onChange(value, name), 600),
    [onChange, name],
  );

  // Обработчик изменений в поле
  const onChangeHandler = event => {
    setInputValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setInputValue(value), [value]);

  const cn = bem('Input');
  return (
    <input
      ref={inputRef}
      className={cn({ theme })}
      value={inputValue}
      type={type}
      placeholder={placeholder}
      onChange={onChangeHandler}
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
