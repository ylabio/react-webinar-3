import {memo, useCallback, useLayoutEffect, useState} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {

  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  // const onChangeDebounce = useCallback(
  //   value => props.onChange(value, props.name),
  //   [props.onChange, props.name]
  // );

  // Обработчик изменений в поле
  const onChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  // Обновление стейта, если передан новый value
  // useLayoutEffect(() => setValue(props.value), [props.value]);
console.log('props.value',props.value)
  const cn = bem('Input');
  return (
    <input
      className={cn({theme: props.theme})}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
    />
  )
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
}

Input.defaultProps = {
  onChange: () => {
  },
  type: 'text',
  theme: ''
}

export default memo(Input);
