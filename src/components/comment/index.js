import { memo } from 'react';
import Button from '../button';
import NewComment from '../new-comment';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function Comment({
  comment,
  onReply,
  isFormOpen,
  onSubmit,
  onCancel,
  childComments = [] // Добавляем проп для вложенных комментариев
}) {
  const cn = bem('Comment');

  // Форматирование даты
  const formattedDate = new Date(comment.dateCreate).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={cn()}>
      <article className={cn('content')}>
        <div className={cn('header')}>
          <h3 className={cn('author')}>{comment.author.profile.name}</h3>
          <time
            className={cn('date')}
            dateTime={comment.dateCreate}
            title={formattedDate}
          >
            {formattedDate}
          </time>
        </div>

        {comment.isDeleted ? (
          <p className={cn('deleted')}>Комментарий удалён</p>
        ) : (
          <>
            <div className={cn('text')}>{comment.text}</div>
            {onReply && (
              <Button
                className={cn('reply-btn')}
                style="text"
                onClick={() => onReply(comment._id)}
                title="Ответить"
              />
            )}
          </>
        )}
      </article>

      {/* Вложенные комментарии */}
      {childComments.length > 0 && (
        <div className={cn('children')}>
          {childComments.map(child => (
            <Comment
              key={child._id}
              comment={child}
              onReply={onReply}
              isFormOpen={isFormOpen === child._id}
              onSubmit={(text) => onSubmit(child._id, 'comment', text)}
              onCancel={onCancel}
            />
          ))}
        </div>
      )}

      {/* Форма ответа */}
      {isFormOpen && (
        <div className={cn('reply-form')}>
          <NewComment
            onSubmit={(text) => onSubmit(comment._id, 'comment', text)}
            onCancel={onCancel}
          />
        </div>
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    dateCreate: PropTypes.string.isRequired,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    isDeleted: PropTypes.bool
  }).isRequired,
  onReply: PropTypes.func,
  isFormOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  childComments: PropTypes.arrayOf(PropTypes.object)
};

export default memo(Comment);
