import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import commentsActions from '../../store-redux/comments/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function Reply({commentId, user, exists, onSignIn, onReply, t}) {
  const cn = bem('Reply');

  const dispatch = useDispatch();

  const [text, setText] = useState('')

  const params = useParams();

  return (
    <div className={cn()}>
      {exists ? 
        <div className={cn('form')}>
          <div className={cn('head')}>{t("comments.newAnswer")}</div>
          <textarea rows='4' value={text} onInput={e => setText(e.target.value)}></textarea>
          <div className={cn('buttons')}>
            <button onClick={() => {
              dispatch(commentsActions.send({"text": text, "parent": commentId}));
            }}>{t("comments.send")}</button>
            <button onClick={() => onReply(null)}>{t("comments.cancel")}</button>
          </div>
        </div> : 
        <div className={cn('login')}>
          <button onClick={() => onSignIn()}>{t("comments.signIn")}</button>, {t("comments.signInDescription")}
        </div>}
    </div>
  );
}

export default memo(Reply);