import {memo, useCallback, useState} from 'react';
import {useParams} from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';
import Comments from '../../components/comments';
import ReplyLine from '../../components/reply-line';
import ReplyForm from '../../components/reply-form';
import { useDispatch } from 'react-redux';

function ArticleComments({comments, usernames}) {

  const params = useParams();

  const dispatch = useDispatch();

  const [commentId, setCommentId] = useState(null);

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists
  }));

  const {t} = useTranslate();

  const callbacks = {
    onReply: useCallback(event => {
      setCommentId(event.target.value);
    }, []),
    onCancel: useCallback(() => {
      setCommentId(null);
    }, []),
    onSubmit: event => {
      event.preventDefault();
      const text = event.target.comment.value;
      dispatch(commentsActions.uploadComment(params.id, text, commentId));
      setTimeout(() => dispatch(commentsActions.load(params.id)), 100);
    },
  }

  const replyForm = select.exists
    ? <ReplyForm id={commentId} onCancel={callbacks.onCancel} onSubmit={callbacks.onSubmit} />
    : <ReplyLine exists={select.exists} id={commentId} onCancel={callbacks.onCancel} />;

  return <Comments 
    comments={comments} 
    usernames={usernames} 
    commentId={commentId}
    replyForm={replyForm}
    onReply={callbacks.onReply}
    onCancel={callbacks.onCancel}
    t={t} 
    />
}

export default memo(ArticleComments);
