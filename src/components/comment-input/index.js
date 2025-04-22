import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function CommentInput(props) {
  const { onChange = () => {}, type = 'text' } = props;

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
      required
    />
  );
}

CommentInput.PropTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
}


export default memo(CommentInput);
