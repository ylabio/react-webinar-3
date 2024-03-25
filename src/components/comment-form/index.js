import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import AuthQuest from "../auth-quest";

function CommentForm(props) {

  const textareaRef = useRef(null);

  const [value, setValue] = useState('')

  const cn = bem('CommentForm')

  const callbacks = {
    closeForm: () => props.closeForm(),
    onSubmit: (e) => {
      e.preventDefault()
      props.onSubmit(props.id, props.type, value)
      setValue('')
      if (props.type === 'comment') callbacks.closeForm()
    }
  }

  useEffect(() => {
    if (props.type === 'comment') {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, []);

  return props.isAuth ? (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <div className={cn('title')}>Новый {props.type === 'comment' ? 'ответ' : 'комментарий'}</div>
      <textarea
        ref={textareaRef}
        className={cn('input')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={cn('btns')}>
        <button onClick={callbacks.onSubmit}>Отправить</button>
        {props.type === 'comment' && <button onClick={() => callbacks.closeForm()}>Отмена</button>}
      </div>
    </form>
  ) : props.noSession
}

CommentForm.PropTypes = {
  type: PropTypes.oneOf(['comment', 'article']),
  closeForm: PropTypes.func,
  onSubmit: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

CommentForm.defaultProps = {
  closeForm: () => {},
  onSubmit: () => {},
}

export default React.memo(CommentForm);