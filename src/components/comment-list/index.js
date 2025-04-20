import { memo, useState, useEffect, useMemo, useCallback } from 'react';
// import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import { useParams } from 'react-router-dom';
import CommentCard from '../comment-card';
import useSelector from '../../hooks/use-selector';
import { Link } from 'react-router-dom';
import CommentForm from '../comment-form';

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
      e => {
        setNewComment({
          parent,
          text: e.target.value,
        });
      },
      [setNewComment, replyToCommentId],
    ),

    handleAddComment: useCallback(
      async e => {
        e.preventDefault();
        if (newComment) {
          await dispatch(commentsActions.create(newComment));
          dispatch(commentsActions.load(params.id));
          setIsReplyActive(false);
        }
      }, [newComment]
    )
  };

  // const handleReplyClick = (commentId) => {
  //   if (!isAuthenticated) {
  //     setAuthMessageCommentId(commentId);
  //   } else {
  //     setAuthMessageCommentId(null);
  //   }
  // }
  const cn = bem('CommentList');

  return (
    <div className={cn()}>
      <p className={cn('title')}>Комментарии ({typeof commentCount === 'number' ? commentCount : 0})</p>
    
      {comments ? 
        comments.map(comment => 
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
          />
        ) : (
          <p>Комментарии недоступны</p>
        )
      }

      {/* Форма для нового комментария */}
      {isAuthenticated && !isReplyActive && (
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

// CommentList.propTypes = {
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

export default memo(CommentList);
