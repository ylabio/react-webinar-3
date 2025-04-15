import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';
import './style.css';

function Input({
  value = '',
  name = '',
  type = 'text',
  placeholder = '',
  onChange = (value, name) => {},
  theme = '',
  delay = 0,
}) {
  // Внутренний стейт для быстрого отображения ввода
  const [valueInp, setValue] = useState(value);

  const onChangeDebounce = useCallback(
    debounce(value => onChange(value, name), delay),
    [onChange, name],
  );

  // Обработчик изменений в поле
  const onChangeInp = event => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(value), [value]);

  const cn = bem('Input');
  return (
    <input
      className={cn({ theme: theme })}
      value={valueInp}
      type={type}
      placeholder={placeholder}
      onChange={onChangeInp}
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
};

export default memo(Input);
