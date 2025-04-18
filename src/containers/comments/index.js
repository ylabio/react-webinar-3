import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import commentsActions from '../../store-redux/comments/actions';
import Comment from '../../components/comment';
import CommentForm from '../../components/comment-form';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

function Comments({ articleId }) {
  const dispatch = useDispatch();
  const store = useStore();
  const cn = bem('Comments');

  const { items, replyTo } = useReduxSelector(state => state.comments);
  const select = useSelector(state => ({
    isAuth: state.session.exists,
  }));

  useEffect(() => {
    dispatch(commentsActions.load(articleId));
  }, [articleId]);

  const onReply = useCallback(commentId => {
    dispatch(commentsActions.setReply(commentId));
  }, []);

  // Строим дерево комментариев
  const buildCommentsTree = comments => {
    const tree = [];
    const commentMap = {};

    // Создаем мапу комментариев и добавляем информацию о том, кому отвечаем
    comments.forEach(comment => {
      const parentComment = comments.find(c => c._id === comment.parent._id);
      commentMap[comment._id] = {
        ...comment,
        children: [],
        replyTo: comment.parent._type === 'comment' ? `User №${parentComment?.author?._id}` : null,
      };
    });

    comments.forEach(comment => {
      if (comment.parent._type === 'comment') {
        const parentComment = commentMap[comment.parent._id];
        if (parentComment) {
          parentComment.children.push(commentMap[comment._id]);
        }
      } else {
        tree.push(commentMap[comment._id]);
      }
    });

    return tree;
  };

  const renderComments = comments => {
    return comments.map(comment => (
      <div key={comment._id}>
        <Comment data={comment} onReply={onReply} showReplyForm={replyTo} isAuth={select.isAuth} />
        {comment.children?.length > 0 && (
          <div className={cn('replies')}>{renderComments(comment.children)}</div>
        )}
        {replyTo === comment._id && (
          <div className={cn('reply-form')}>
            <CommentForm
              parentId={comment._id}
              parentType="comment"
              replyToUserId={comment.author?._id}
            />
          </div>
        )}
      </div>
    ));
  };

  const commentsTree = buildCommentsTree(items);

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Комментарии ({items.length})</h2>
      <div className={cn('list')}>{renderComments(commentsTree)}</div>
      {select.isAuth ? (
        !replyTo && <CommentForm parentId={articleId} parentType="article" />
      ) : (
        <div className={cn('auth-message')}>
          <Link to="/login" className={cn('auth-link')}>
            Войдите
          </Link>
          , чтобы иметь возможность комментировать
        </div>
      )}
    </div>
  );
}

export default memo(Comments);
