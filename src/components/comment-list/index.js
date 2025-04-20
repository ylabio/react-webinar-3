import { memo, useState, useMemo, useCallback } from 'react';
// import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
// import numberFormat from '../../utils/number-format';
// import Button from '../button';
import './style.css';
// import dateFormat from '../../utils/date-format';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import { useParams } from 'react-router-dom';
import CommentCard from '../comment-card';
import useSelector from '../../hooks/use-selector';
import { Link } from 'react-router-dom';
import Button from '../button';

function CommentList(props) {
  const { comments, commentCount, t = text => text } = props;
  // Устанавливаем идентификатор текущего комментария
  const [authMessageCommentId, setAuthMessageCommentId] = useState(null);
  // Скрываем форму добавления нового комментария
  const [showNewCommentForm, setShowNewCommentForm] = useState(true);
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

    onSubmit: useCallback(
      async e => {
        // e.preventDefault();
        if (newComment) {
          // e.preventDefault();
          await dispatch(commentsActions.create(newComment));
          dispatch(commentsActions.load(params.id));
        }
      }, [newComment],
    )
  };
  
  const isAuthenticated = select.exists;

  const handleAddComment = (parentId, commentText) => {
    if (!isAuthenticated) {
      // @todo написать логику обработки авторизации
    } else {
      // @todo написать логику добавления комментария
      console.log(parentId, commentText);
      callbacks.onSubmit(parentId, commentText);
    }
    setReplyToCommentId(null); // Сбросить ID после добавления комментария
  }

  const handleReplyClick = (commentId) => {
    if (!isAuthenticated) {
      setAuthMessageCommentId(commentId);
    } else {
      setAuthMessageCommentId(null);
    }
  }

  const cn = bem('CommentList');

  return (
    <>
      <div className={cn('comments')}>
        Комментарии ({typeof commentCount === 'number' ? commentCount : 0})
      </div>
      <div>
      {comments ? 
        comments.map(comment => 
          <CommentCard 
            key={comment._id} 
            comment={comment}
            handleAddComment={handleAddComment}
            isAuthenticated={isAuthenticated}
            onReplyClick={() => handleReplyClick(comment._id)}

            setAuthMessageCommentId={setAuthMessageCommentId}
            authMessageCommentId={authMessageCommentId}
            replyToCommentId={replyToCommentId}
            setReplyToCommentId={setReplyToCommentId}

            setShowNewCommentForm={setShowNewCommentForm}
            onChange={callbacks.onChange}
          />
        ) : (
          <p>Комментарии недоступны</p>
        )
      }

        {/* Форма для нового комментария */}
        {isAuthenticated && showNewCommentForm ? (
          <form onSubmit={(e) => {
            e.preventDefault();
            const newCommentText = e.target.elements.newComment.value;
            handleAddComment(null, newCommentText); // Передаем null как parentId для нового комментария
            setShowNewCommentForm(false); // Скрываем форму после отправки
          }}>
            <p>Новый комментарий</p>
            <textarea name="newComment" required onChange={callbacks.onChange} />
            <div className={cn('action')}>
              <Button style="primary" type="submit" title="Отправить" />
            </div>
          </form>
        ) : (
          isAuthenticated && (
            <button onClick={() => setShowNewCommentForm(true)}>Добавить комментарий</button>
          )
        )}

        {!isAuthenticated && !authMessageCommentId && (
          <div className={cn('authcaution')}>
            <Link to='/login' style={{ color: 'var(--primary)' }}>Войдите</Link>, чтобы иметь возможность комментировать
          </div>
        )}
      </div>
    </>
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
