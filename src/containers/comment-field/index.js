import {memo, useCallback, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import useSelector from "../../hooks/use-selector";
import commentsActions from '../../store-redux/comments/actions';
import CommentInput from "../../components/comment-input";
import CommentNotice from "../../components/comment-notice";
import useTranslate from "../../hooks/use-translate";

function CommentField({ type, id }) {
  const [text, setText] = useState('');

  const {t} = useTranslate();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    token: state.session.token,
    exists: state.session.exists,
    user: state.session.user
  }));

  const callbacks = {
    onRemove: useCallback(() => dispatch(commentsActions.removeCurrentId()), []),
    onSend: useCallback(() => dispatch(commentsActions.send(select.token, id, type, text, select.user)), [select.user, text]),
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
  }

  return (
    select.exists
      ? <CommentInput 
        title={t(type === 'comment' ? 'comment.input' : 'article.input')} 
        onInput={setText}
        type={type}>
        <button onClick={() => callbacks.onSend()}>{t('comment.send')}</button>
        {type === 'comment' && <button onClick={() => callbacks.onRemove()}>{t('comment.cancel')}</button>}
      </CommentInput>
      : <CommentNotice text={t(type === 'comment' ? 'comment.notice' : 'article.notice')}>
        <a onClick={() => callbacks.onSignIn()}>{t('comment.signIn')}</a>
        {type === 'comment' && <a style={{color: 'grey'}}onClick={() => callbacks.onRemove()}>{t('comment.cancel')}</a>}
      </CommentNotice>
  )
}

export default memo(CommentField);
