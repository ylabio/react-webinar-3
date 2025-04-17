import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import formatDate from '../../utils/date-format';
import CommentNew from '../comment-new';
import CommentLogin from '../comment-login';
import './style.css';

function CommentItem({
  comment,
  onReply,
  activeCommentId,
  resetActiveComment,
  sessionExists,
  createComment,
  profileName,
}) {
  const cn = bem('CommentItem');

  const style = {
    marginLeft: `${comment.level * 40}px`,
  };

  return (
    <div className={cn()} style={style}>
      <div className={cn('info')}>
        <div className={cn('user')}>{comment.author?.profile?.name || profileName}</div>
        <div className={cn('date')}>{formatDate(comment.dateCreate)}</div>
      </div>

      <div className={cn('text')}>{comment.text}</div>

      <button className={cn('button')} onClick={() => onReply(comment._id)}>
        Ответить
      </button>

      {activeCommentId === comment._id && sessionExists ? (
        <CommentNew
          status="reply"
          onSubmit={text => createComment(text, comment._id)}
          onCancel={resetActiveComment}
        />
      ) : (
        activeCommentId === comment._id && <CommentLogin />
      )}
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    level: PropTypes.number,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
  onReply: PropTypes.func.isRequired,
  activeCommentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  resetActiveComment: PropTypes.func.isRequired,
  sessionExists: PropTypes.bool.isRequired,
  createComment: PropTypes.func.isRequired,
};

export default memo(CommentItem);
