import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';
import './style.css';

function Input({ value, name, type = 'text', placeholder, onChange = () => {}, theme = '' }) {
  // Используем локальное состояние для быстрого отображения ввода
  const [inputValue, setInputValue] = useState(value);

  const onChangeDebounce = useCallback(
    debounce(val => onChange(val, name), 600),
    [onChange, name],
  );

  // Обработчик изменения значения инпута
  const handleChange = event => {
    setInputValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновляем внутреннее состояние, если изменяется внешний проп value
  useLayoutEffect(() => {
    setInputValue(value);
  }, [value]);

  const cn = bem('Input');
  return (
    <input
      className={cn({ theme })}
      id="search"
      value={inputValue}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
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
