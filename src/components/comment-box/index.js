import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';

function CommentBox(props) {

  const cn = bem('CommentBox');

  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };


  const callbacks = {
    handleSubmit:(e) => {
      e.preventDefault();
      props.onSubmit(text);
      setText('');
    },

    handleClose:() => {
      props.onClose();
      setText('');
    },
  }

  return (
    <div className={cn()}>
      <p className={cn('text')}>Новый комментарий</p>
      <textarea
        className={cn('textarea')}
        value={text}
        onChange={handleChange} />
      <div className={cn('box')}>
        <button onClick={callbacks.handleSubmit}>Отправить</button>
        <button onClick={callbacks.handleClose}>Отмена</button>
      </div>
    </div>
  );
}

CommentBox.defaultProps = {

  onSubmit: () => {
  },
  onClose: () => {
  },
}

export default memo(CommentBox);
