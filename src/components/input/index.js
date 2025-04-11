import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { memo, useCallback, useLayoutEffect, useState } from 'react';

import './style.css';

function Input({
  placeholder,
  value,
  name,
  onChange = () => {},
  type = 'text',
  theme = '',
  debounceTime = 600,
}) {
  // Внутренний стейт для быстрого отображения ввода
  const [inputValue, setInputValue] = useState(value);

  const onChangeDebounce = useCallback(
    debounce(inputValue => onChange(inputValue, name), debounceTime),
    [onChange, name],
  );

  // Обработчик изменений в поле
  const onInputChange = event => {
    setInputValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setInputValue(value), [value]);

  const cn = bem('Input');
  return (
    <input
      className={cn({ theme: theme })}
      value={inputValue}
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
  debounceTime: PropTypes.number,
};

export default memo(Input);
