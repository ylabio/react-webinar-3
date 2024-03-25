import { memo, useCallback, useEffect, useState } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import CommentCard from '../../components/comment-card';
import CommentSection from '../../components/comment-section';
import commentActions from '../../store-redux/comment/actions';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import { useParams } from 'react-router-dom';

function Comments() {
  const store = useStore();

  const dispatch = useDispatch();

  const params = useParams();

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
  }

  const { t } = useTranslate();

  const renders = {
    item: useCallback(item => (
      <CommentCard
        comment={item}
        depth={1}
        replyingTo={replyingTo}
        onReply={callbacks.handleReply}
        handleCommentSubmit={callbacks.handleCommentSubmit}
        session={session}
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
        t={t}
      />
    </>
  );
}

export default memo(Comments);
