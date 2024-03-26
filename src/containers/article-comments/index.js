import {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';
import Comments from '../../components/comments';
import ReplyLine from '../../components/reply-line';
import ReplyForm from '../../components/reply-form';
import { useDispatch } from 'react-redux';

function ArticleComments({comments}) {

  const params = useParams();

  const location = useLocation();

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
      const text = event.target.comment.value.trim();
      if (text) dispatch(commentsActions.uploadComment(params.id, text, commentId));
    },
  }

  const ref = useRef();

  useEffect(() => {
    commentId && ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest'});
  }, [ref.current])

  const replyForm = (level) => select.exists
    ? <ReplyForm id={commentId} level={level} ref={ref} onCancel={callbacks.onCancel} onSubmit={callbacks.onSubmit} t={t} />
    : <ReplyLine exists={select.exists} id={commentId} level={level} ref={ref} location={location.pathname} onCancel={callbacks.onCancel} t={t} />;

  return <Comments 
    comments={comments} 
    commentId={commentId}
    currentUser={select.user}
    replyForm={replyForm}
    onReply={callbacks.onReply}
    onCancel={callbacks.onCancel}
    t={t} 
    />
}

export default memo(ArticleComments);
