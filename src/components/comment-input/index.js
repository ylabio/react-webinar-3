import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function CommentInput(props) {
  const { onChange = () => {}, type = 'text', padding = 0 } = props;

  // Обработчик изменений в поле
  const onChangeHandler = event => {
    onChange(event.target.value);
  };


  const cn = bem('CommentInput');
  return (
    <textarea
      className={cn()}
      value={props.value}
      type={type}
      placeholder={props.placeholder}
      onChange={onChangeHandler}
      style={{ width: `calc(100% + ${padding}px)`, maxWidth: `calc(1152px - ${padding}px`}}
    />
  );
}

CommentInput.PropTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  padding: PropTypes.number,
}


export default memo(CommentInput);
