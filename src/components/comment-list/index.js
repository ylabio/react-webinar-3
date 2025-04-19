import { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
// import numberFormat from '../../utils/number-format';
// import Button from '../button';
import './style.css';
// import dateFormat from '../../utils/date-format';

import CommentCard from '../comment-card';
import useSelector from '../../hooks/use-selector';
import { Link } from 'react-router-dom';

function CommentList(props) {
  const { comments, commentCount, t = text => text } = props;

  const [showAuthMessage, setShowAuthMessage] = useState(false);
  const [authMessageCommentId, setAuthMessageCommentId] = useState(null);
  const [showNewCommentForm, setShowNewCommentForm] = useState(true);
  const [replyToCommentId, setReplyToCommentId] = useState(null);

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));
  
  const isAuthenticated = false;
  // const isAuthenticated = select.exists;

  const handleAddComment = (parentId, commentText) => {
    if (!isAuthenticated) {
      // @todo написать логику обработки авторизации
    } else {
      // @todo написать логику добавления комментария
      console.log(parentId, commentText);
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
            showAuthMessage={authMessageCommentId === comment._id}
            onReplyClick={() => handleReplyClick(comment._id)}
            setAuthMessageCommentId={setAuthMessageCommentId}
            authMessageCommentId={authMessageCommentId}
            replyToCommentId={replyToCommentId} // Передаем ID для ответа
            setReplyToCommentId={setReplyToCommentId} // Передаем функцию для сброса ID
            setShowNewCommentForm={setShowNewCommentForm}
          />
        ) : (
          <p>Комментарии недоступны</p>
        )
      }

        {/* Форма для нового комментария */}
        {isAuthenticated && showNewCommentForm ? (
        // {isAuthenticated && showNewCommentForm ? ( 
          <form onSubmit={(e) => {
            e.preventDefault();
            const newCommentText = e.target.elements.newComment.value;
            handleAddComment(null, newCommentText); // Передаем null как parentId для нового комментария
            setShowNewCommentForm(false); // Скрываем форму после отправки
          }}>
            <input type="text" name="newComment" placeholder="Ваш комментарий..." required />
            <button type="submit">Отправить</button>
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
