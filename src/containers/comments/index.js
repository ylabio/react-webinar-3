import { memo, useCallback, useEffect, useState } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import CommentCard from '../../components/comment-card';
import CommentSection from '../../components/comment-section';
import commentActions from '../../store-redux/comment/actions';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';

function Comments() {
  const store = useStore();

  const dispatch = useDispatch();

  const params = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const { comments } = useSelectorRedux(state => ({
    comments: state.comment.data
  }));

  const { session } = useSelector(state => ({
    session: state.session
  }));

  const [replyingTo, setReplyingTo] = useState(null);

  const callbacks = {
    // Выбрать комментарий для ответа
    handleReply: useCallback(comment_id => setReplyingTo(comment_id), [store]),
    // Отправить ответ
    handleCommentSubmit: useCallback(commentData => dispatch(commentActions.submit(commentData)), [store]),
    // Переход на страницу логина
    handleLogin: useCallback((e) => {
      e.preventDefault();

      localStorage.setItem('replyingTo', replyingTo || params.id);
      navigate('/login', {state: {back: location.pathname}});
    })
  }

  useInit(() => {
    setReplyingTo(localStorage.getItem('replyingTo'));
  }, [])

  const translate = useTranslate();

  useInit(() => {
    dispatch(commentActions.load(params.id))
  }, [params.id, translate])

  const { t } = translate;

  const renders = {
    item: useCallback(item => (
      <CommentCard
        comment={item}
        depth={1}
        replyingTo={replyingTo}
        onReply={callbacks.handleReply}
        handleCommentSubmit={callbacks.handleCommentSubmit}
        session={session}
        handleLogin={callbacks.handleLogin}
        t={t} />
    ), [replyingTo, session]),
  };

  return (
    <>
      <CommentSection
        articleId={params.id}
        comments={comments.items}
        renderItem={renders.item}
        count={comments.count}
        replyingTo={replyingTo}
        onReply={callbacks.handleReply}
        handleCommentSubmit={callbacks.handleCommentSubmit}
        session={session}
        handleLogin={callbacks.handleLogin}
        t={t}
      />
    </>
  );
}

export default memo(Comments);
