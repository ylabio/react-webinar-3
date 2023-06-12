import {memo, useState} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";

function AddCommentForm(props) {
  const [value, setValue] = useState('');
  const cn = bem('CommentForm');

  const callbacks = {
    onChange: (e) => setValue(e.target.value),
    onSubmit: (e) => {
      e.preventDefault();
      if (value.trim() !== "") {
        props.onSubmit(value)
      }
    }
  }

  return <form onSubmit={callbacks.onSubmit} className={cn()}>
    <span className={cn('label')}>Новый комментарий</span>
    <textarea onChange={callbacks.onChange} value={value} className={cn('textarea')} />
    <button type='submit' className={cn('button')}>Отправить</button>
  </form>
}

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func,
  id: PropTypes.string,
}

export default memo(AddCommentForm)