import { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import formatDate from '../../utils/date-format';
import CommentNew from '../comment-new';
import CommentLogin from '../comment-login';
import useTranslate from '../../hooks/use-translate';
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
  const commentNewRef = useRef(null);
  const { t } = useTranslate();

  const isAuthor = profileName === comment.author?.profile?.name;
  const maxLevel = 5;
  const baseMarginLeft = '40px';
  const childrenMarginLeft = comment.level < maxLevel ? baseMarginLeft : '0';

  useEffect(() => {
    if (activeCommentId === comment._id && commentNewRef.current) {
      commentNewRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeCommentId, comment._id]);

  return (
    <div className={cn()}>
      <div className={cn('info')}>
        <div className={cn('user', { authenticated: isAuthor })}>
          {comment.author?.profile?.name}
        </div>
        <div className={cn('date')}>{formatDate(comment.dateCreate, t('comments.date'))}</div>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      <button className={cn('button')} onClick={() => onReply(comment._id)}>
        {t('comments.reply')}
      </button>

      {comment.children && comment.children.length > 0 && (
        <div className={cn('children')} style={{ marginLeft: childrenMarginLeft }}>
          {comment.children.map(childComment => (
            <CommentItem
              key={childComment._id}
              comment={childComment}
              onReply={onReply}
              activeCommentId={activeCommentId}
              resetActiveComment={resetActiveComment}
              sessionExists={sessionExists}
              createComment={createComment}
              profileName={profileName}
            />
          ))}
        </div>
      )}

      {activeCommentId === comment._id && sessionExists ? (
        <div style={{ marginLeft: baseMarginLeft }} ref={commentNewRef}>
          <CommentNew
            status="reply"
            onSubmit={text => createComment(text, comment._id)}
            onCancel={resetActiveComment}
          />
        </div>
      ) : (
        activeCommentId === comment._id && (
          <div style={{ marginLeft: baseMarginLeft }} ref={commentNewRef}>
            <CommentLogin />
          </div>
        )
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
  profileName: PropTypes.string,
};

export default memo(CommentItem);
