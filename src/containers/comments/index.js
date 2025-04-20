import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useInit from '../../hooks/use-init';
import useAuth from '../../hooks/use-auth';
import useComments from '../../hooks/use-comments';
import CommentList from '../../components/comment-list';
import CommentForm from '../../components/comment-form';
import Spinner from '../../components/spinner';
import commentActions from '../../store-redux/comments/actions';

function CommentsBlock() {
  const dispatch = useDispatch();
  const { id: articleId } = useParams();
  const isAuth = useAuth(); // Получаем статус авторизации
  const { tree: comments, waiting } = useSelector(state => state.comments);

  const {
    replyTo,
    showLoginForComment,
    commentText,
    replyText,
    setCommentText,
    setReplyText,
    handleSubmit,
    handleReplyClick,
  } = useComments(articleId, isAuth); // Передаем isAuth в хук

  useInit(() => {
    dispatch(commentActions.load(articleId));
  }, [articleId]);

  return (
    <Spinner active={waiting}>
      <CommentList
        comments={comments}
        onReply={handleReplyClick}
        replyTo={replyTo}
        isAuth={isAuth}
        onSubmit={handleSubmit}
        articleId={articleId}
        showLoginForComment={showLoginForComment}
        replyText={replyText}
        onReplyTextChange={e => setReplyText(e.target.value)}
      />

      {isAuth && !replyTo && (
        <CommentForm
          onSubmit={text => handleSubmit(text, articleId, 'article')}
          title="Новый комментарий"
          placeholder="Ваш комментарий..."
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
      )}
    </Spinner>
  );
}

export default memo(CommentsBlock);
