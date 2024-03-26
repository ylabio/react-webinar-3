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

  const [comment, setComment] = useState(null);
  const [lastChild, setLastChild] = useState(null);

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists
  }));

  const {t} = useTranslate();

  const callbacks = {
    onReply: useCallback(comment => {
      let lastChild = comment;
      while (lastChild?.children.length > 0) {
        lastChild = lastChild.children.at(-1)
      }
      setComment(comment);
      setLastChild(lastChild);
    }, []),
    onCancel: useCallback(() => {
      setComment(null);
      setLastChild(null);
    }, []),
    onSubmit: event => {
      event.preventDefault();
      const text = event.target.comment.value.trim();
      if (text) dispatch(commentsActions.uploadComment(params.id, text, comment._id));
    },
  }

  const ref = useRef();

  useEffect(() => {
    comment && ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest'});
  }, [ref.current])

  const replyForm = () => select.exists
    ? <ReplyForm id={comment?._id} level={comment?.level} ref={ref} onCancel={callbacks.onCancel} onSubmit={callbacks.onSubmit} t={t} />
    : <ReplyLine exists={select.exists} id={comment?._id} level={comment?.level} ref={ref} location={location.pathname} onCancel={callbacks.onCancel} t={t} />;

  return <Comments 
    comments={comments} 
    commentId={lastChild?._id}
    currentUser={select.user}
    replyForm={replyForm}
    onReply={callbacks.onReply}
    onCancel={callbacks.onCancel}
    t={t} 
    />
}

export default memo(ArticleComments);
