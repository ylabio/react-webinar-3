import { memo, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useDispatch } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';
import { useParams } from 'react-router-dom';
import CommentCard from '../comment-card';
import { Link } from 'react-router-dom';
import CommentForm from '../comment-form';
import debounce from 'lodash.debounce';

function CommentList(props) {
  const { comments, commentCount, t = text => text } = props;
  // Устанавливаем идентификатор текущего комментария
  const [authMessageCommentId, setAuthMessageCommentId] = useState(null);
  // Активна ли форма ответа
  const [isReplyActive, setIsReplyActive] = useState(false);
  // Передаем ID для ответа
  const [replyToCommentId, setReplyToCommentId] = useState(null);

  const params = useParams();
  const [newComment, setNewComment] = useState({
    parent: {
      _id: '',
      _type: '',
    },
    text: '',
  });

  const dispatch = useDispatch();

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const isAuthenticated = select.exists;

  const parent = useMemo(
    () => ({
      _id: replyToCommentId || params.id,
      _type: replyToCommentId ? 'comment' : 'article',
    }),
    [replyToCommentId, params.id],
  );

  const callbacks = {
    onChange: useCallback(
      debounce(
        e => {
        setNewComment({
          parent,
          text: e.target.value,
        });
      }, 
      100),
      [setNewComment, replyToCommentId]
    ),

    handleAddComment: useCallback(
      async e => {
        e.preventDefault();
        if (newComment.text) {
          console.log('comment', newComment);
          await dispatch(commentsActions.create(newComment));
          dispatch(commentsActions.load(params.id));
          setIsReplyActive(false);
        }
      }, [dispatch, newComment, params.id]
    )
  };

  const cn = bem('CommentList');

  const getMaxDepth = (comments) => {
    let max = 0;
    const traverse = (comments, depth) => {
      if (depth > max) {
        max = depth;
      }
      comments.forEach(comment => {
        if (comment.children && comment.children.length > 0) {
          traverse(comment.children, depth + 1);
        }
      });
    };
    traverse(comments, 0);
    return max;
  };

  let maxDepth = getMaxDepth(comments);
  if (maxDepth > 5) maxDepth = 5;

  return (
    <div className={cn()}>
      <p className={cn('title')}>Комментарии ({typeof commentCount === 'number' ? commentCount : 0})</p>
    
      {comments ? 
        comments.map(comment =>
          <div key={comment._id}>
            <CommentCard 
              key={comment._id} 
              comment={comment}
              isAuthenticated={isAuthenticated}
              handleAddComment={callbacks.handleAddComment}
              setAuthMessageCommentId={setAuthMessageCommentId}
              authMessageCommentId={authMessageCommentId}
              replyToCommentId={replyToCommentId}
              setReplyToCommentId={setReplyToCommentId}
              isReplyActive={isReplyActive}
              setIsReplyActive={setIsReplyActive}
              onChange={callbacks.onChange}
              depth={0}
              maxDepth={maxDepth}
            />
          </div>
        ) : (
          <p>Комментарии недоступны</p>
        )
      }

      {isAuthenticated && 
      !isReplyActive && 
      (
        <CommentForm
          commentTitle="Новый комментарий"
          type="comment"
          setIsReplyActive={setIsReplyActive}
          onSubmit={callbacks.handleAddComment}
          onChange={callbacks.onChange}
        />
      )}

      {!isAuthenticated && !authMessageCommentId && (
        <div className={cn('authcaution')}>
          <Link to='/login' style={{ color: 'var(--primary)' }}>Войдите</Link>, чтобы иметь возможность комментировать
        </div>
      )}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    children: PropTypes.array,
    parent: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _type: PropTypes.string
    }),
  }).isRequired,
  commentCount: PropTypes.number,
  t: PropTypes.func,
};

export default memo(CommentList);
