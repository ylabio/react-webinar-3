import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import Button from '../button';
import './style.css';
import useTranslate from '../../hooks/use-translate';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Comment from '../comment';
import ReplyForm from '../reply-form';
import commentsActions from '../../store-redux/comments/actions';
import { useDispatch } from 'react-redux';

function CommentsCard(props) {
  // const { article, onAdd = () => {}, t = text => text } = props;

  const cn = bem('CommentsCard');
  const { t } = useTranslate();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const [replyToCommentId, setReplyToCommentId] = useState(null);

  const rootComments = props.comments.filter(
    comment => comment.parent._type === 'article' && !comment.isDeleted,
  );

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    // Отправка комментария
    onSendReply: useCallback(data => dispatch(commentsActions.reply(data)), [replyToCommentId]),
  };

  const loginComment = (
    <div className={cn('login')}>
      <Button style="login" onClick={callbacks.onSignIn} title={t('session.signIn')} />
      <span className={cn('label')}> , чтобы иметь возможность комментировать</span>
    </div>
  );

  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии ({props.count})</div>
      <div className={cn('comments')}>
        {rootComments.length > 0 &&
          rootComments.map(comment => (
            <Comment
              key={comment._id}
              comment={comment}
              comments={props.comments}
              level={0}
              isLogin={select.exists}
              loginComment={loginComment}
              replyToCommentId={replyToCommentId}
              setReplyToCommentId={setReplyToCommentId}
              onSendReply={callbacks.onSendReply}
            />
          ))}
      </div>
      {!select.exists && loginComment}
      {select.exists && !replyToCommentId && (
        <ReplyForm
          title="Новый комментарий"
          placeholder=""
          onChancel={() => {}}
          type={'article'}
          _id={props.article._id}
          onSendReply={callbacks.onSendReply}
        />
      )}
    </div>
  );
}

// CommentsCard.propTypes = {
//   article: PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     description: PropTypes.string,
//     madeIn: PropTypes.object,
//     category: PropTypes.object,
//     edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     price: PropTypes.number,
//   }).isRequired,
//   onAdd: PropTypes.func,
//   t: PropTypes.func,
// };

export default memo(CommentsCard);
