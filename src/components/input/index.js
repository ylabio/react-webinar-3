import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  // debounce будет активен только если noDebounce не передан
  const onChangeDebounce = useCallback(
    debounce(value => props.onChange(value, props.name), 600),
    [props.onChange, props.name],
  );

  // Обработчик изменений в поле
  const onChange = event => {
    setValue(event.target.value);

    // Если noDebounce передан как true, вызываем onChange без debounce
    if (props.noDebounce) {
      props.onChange(event.target.value, props.name);
    } else {
      onChangeDebounce(event.target.value);
    }
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Input');
  return (
    <input
      className={cn({ theme: props.theme })}
      value={value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChange}
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
  noDebounce: PropTypes.bool,
};

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: '',
  noDebounce: false,
};

export default memo(Input);
