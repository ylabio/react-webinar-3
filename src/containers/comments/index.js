import { memo, useCallback, useState } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import CommentCard from '../../components/comment-card';
import listToTree from '../../utils/list-to-tree';
import CommentSection from '../../components/comment-section';
import commentActions from '../../store-redux/comment/actions';
import { useDispatch } from 'react-redux';
import useSelector from '../../hooks/use-selector';

function Comments({ comments, articleId }) {
  const store = useStore();

  const dispatch = useDispatch();

  const select = useSelector(state => ({
    exists: state.session.exists
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
        authorizationCheck={select.exists}
        t={t} />
    ), [replyingTo]),
  };

  let commentTree = []
  if (Object.keys(comments).length !== 0 && comments.count !== 0) {
    console.log(comments)
    commentTree = listToTree(comments.items)[0].children;
  }

  return (
    <>
      <CommentSection
        articleId={articleId}
        comments={commentTree}
        renderItem={renders.item}
        count={comments.count}
        replyingTo={replyingTo}
        handleCommentSubmit={callbacks.handleCommentSubmit}
        authorizationCheck={select.exists}
        t={t}
      />
    </>
  );
}

export default memo(Comments);
