import {memo, useLayoutEffect, useState} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';

import './style.css';

function FormInput(props) {
  // Обработчик изменений в поле
  const onChange = (event) => {
    props.onChange(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => props.onChange(props.value), [props.value]);

  const cn = bem('Input');
  return (
    <input
      className={cn({theme: props.theme})}
      id={props.id}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  )
}

FormInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
}

FormInput.defaultProps = {
  onChange: () => {
  },
  type: 'text',
  theme: ''
}

export default memo(FormInput);
