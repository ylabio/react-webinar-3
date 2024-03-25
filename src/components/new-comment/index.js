import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function NewComment(props) {
  const cn = bem('NewComment');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        Новый комментарий
      </div>
      <textarea className={cn('input')} type='text'></textarea>
      <button className={cn('send')} onClick={() =>{}}>Отправить</button>
    </div>
  )
}


export default memo(NewComment);
