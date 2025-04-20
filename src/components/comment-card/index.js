import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
// import numberFormat from '../../utils/number-format';
// import Button from '../button';
import './style.css';
import dateFormat from '../../utils/date-format';
import { Link } from 'react-router-dom';

function CommentCard(props) {
  // const [showReplyForm, setShowReplyForm] = useState(false);
  const { comment, isAuthenticated,  onReplyClick, handleAddComment, 
    setAuthMessageCommentId, authMessageCommentId, 
    replyToCommentId, setReplyToCommentId, 
    setShowNewCommentForm, onChange } = props;
  const cn = bem('CommentCard');

  const [showReplyForm, setShowReplyForm] = useState(false);
  
  const handleReplyClick = () => {
    if (!isAuthenticated) {
      setAuthMessageCommentId(comment._id);
    } else {
      setReplyToCommentId(replyToCommentId === comment._id ? null : comment._id);
      setShowNewCommentForm(false);
      console.log('replyToCommentId', replyToCommentId);
    }
  };

  const handleSubmitReply = (replyText) => {
    handleAddComment(comment._id, replyText); // Передаем текст ответа родительскому компоненту
    // setShowReplyForm(false); // Скрываем форму после отправки
    setReplyToCommentId(null); // Сбросить ID после отправки ответа
    setShowNewCommentForm(false);
  };

  // Проверяем наличие дочерних комментариев
  // console.log('comment has children', comment);
  // const hasChildren = comment.children && comment.children.length > 0;

  // let lastChild;
  // if (hasChildren) {
  //   lastChild = comment.children[comment.children.length - 1]; // Получаем последний дочерний элемент
  // }
  // (hasChildren && replyToCommentId === lastChild._id)
  // Условие для отображения формы
  const hasChildren = comment.children && comment.children.length > 0;
  const shouldShowReplyForm = isAuthenticated && (replyToCommentId === comment._id);

  {isAuthenticated && (replyToCommentId === comment._id) && (
  <form onSubmit={(e) => {
    e.preventDefault();
    const replyText = e.target.elements.reply.value; // Получаем текст из поля ввода
    handleSubmitReply(replyText);
  }}>
    <input type="text" name="reply" placeholder="Ваш ответ..." required onChange={onChange} />
    <button type="submit">Отправить</button>
  </form>
)}
    

  return (
    <div className={cn()}>
        <div className={cn('info')}>
            <div className={cn('username')}>
                {comment.author.profile.name}
            </div>
            <div className={cn('date')}>
                {dateFormat(comment.dateCreate)}
            </div>
        </div>
        <div className={cn('comment')}>
          {comment._id}<br />
          {comment.text}
        </div>    
        <div className={cn('answer')} onClick={handleReplyClick}>
            Ответить
        </div>

        {!isAuthenticated && (authMessageCommentId === comment._id) && (
          <div className={cn('authcaution')}>
            <Link to='/login' style={{ color: 'var(--primary)' }}>Войдите</Link>, чтобы иметь возможность комментировать
          </div>
        )}
        
      {/* Форма для ответа на комментарий */}
      {/* {showReplyForm && ( */}
      {/* {isAuthenticated && replyToCommentId === comment._id && ( */}
      {/* Форма для ответа на комментарий, рендерится после всех дочерних комментариев на одном уровне */}

      {isAuthenticated && (replyToCommentId === comment._id) && (
        <form onSubmit={(e) => {
          e.preventDefault();
          const replyText = e.target.elements.reply.value;
          handleSubmitReply(replyText);
        }}>
          <input type="text" name="reply" placeholder="Ваш ответ..." required onChange={onChange} />
          <button type="submit">Отправить</button>
        </form>
      )}
       

      {/* Рендерим детей только если глубина меньше MAX_DEPTH */}
      {comment.children && comment.children.length > 0 && (
        <div className={cn('replies')}>
          {comment.children.map((child, index) => (
            <CommentCard 
              key={child._id} 
              comment={child}
              handleAddComment={handleAddComment}
              isAuthenticated={isAuthenticated}
              // showAuthMessage={authMessageCommentId === child._id}
              onReplyClick={() => handleReplyClick(child._id)}
              setAuthMessageCommentId={setAuthMessageCommentId}
              authMessageCommentId={authMessageCommentId}
              replyToCommentId={replyToCommentId} // Передаем ID для ответа
              setReplyToCommentId={setReplyToCommentId} // Передаем функцию для сброса ID
              setShowNewCommentForm={setShowNewCommentForm}
              onChange={onChange}
            />
          ))}
        </div>
      )}

      {/* Форма для ответа на комментарий после последнего дочернего элемента */}
      {isAuthenticated && showReplyForm && (
        <form onSubmit={(e) => {
          e.preventDefault();
          const replyText = e.target.elements.reply.value;
          handleSubmitReply(replyText);
        }}>
          <input type="text" name="reply" placeholder="Ваш ответ..." required />
          <button type="submit">Отправить</button>
        </form>
      )}
   </div>
  );
}     


// CommentCard.propTypes = {
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

export default memo(CommentCard);
