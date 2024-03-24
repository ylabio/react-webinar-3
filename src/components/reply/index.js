import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import commentsActions from '../../store-redux/comments/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function Reply({commentId, user, exists, onSignIn, onReply}) {
  const cn = bem('Reply');

  const dispatch = useDispatch();

  const [text, setText] = useState('')

  const params = useParams();

  return (
    <div className={cn()}>
      {exists ? 
        <div className={cn('form')}>
          <div className={cn('head')}>Новый ответ</div>
          <textarea rows='4' value={text} onInput={e => setText(e.target.value)}></textarea>
          <div className={cn('buttons')}>
            <button onClick={() => {
              dispatch(commentsActions.send({"text": text, "parent": commentId}));
            }}>Отправить</button>
            <button onClick={() => onReply(null)}>Отмена</button>
          </div>
        </div> : 
        <div className={cn('login')}>
          <button onClick={() => onSignIn()}>Войдите</button>, чтобы иметь возможность комментировать
        </div>}
    </div>
  );
}

export default memo(Reply);