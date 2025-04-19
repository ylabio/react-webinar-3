import {memo} from 'react';
import PropTypes from 'prop-types';
import CommentForm from '../comment-form';
import './style.css';
import {useNavigate} from 'react-router-dom';
import AuthHint from "../auth-hint";

function CommentItem({
                       comment,
                       onReply,
                       onCancel,
                       onSend,
                       activeFormTargetId,
                       isAuthorized,
                       user,
                       level
                     }) {
  const isReplying = activeFormTargetId === comment._id;
  const navigate = useNavigate();
  const handleReplyClick = () => {
    onReply(comment._id);
  };

  const handleSubmitReply = text => {
    onSend(text, {_id: comment._id, _type: 'comment'});
  };
  const MAX_INDENT_LEVEL = 4;
  console.log(user._id)
  return (
    <div className="comment-item"
         style={{
           marginLeft: `${Math.min(level, 4) * 40}px`,
           // border: '1px dashed red',
         }} key={String(comment._id)}>
      <div className="comment">
        <div className="comment-item__info">
          <strong style={{
            color: comment.author?._id === user?._id ? '#666' : undefined,
          }}>{comment.author?.profile?.name || 'Аноним'}</strong>{' '}
          <span>
            {new Date(comment.dateCreate)
              .toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
              .replace(' г.', '')
              .replace(',', ' в')}{' '}
          </span>
        </div>

        <div className="comment-item__text">{comment.text}</div>
        {!isReplying && (
          <button
            className="comment-item__reply"
            style={{padding: 0, color: 'var(--primary)'}}
            onClick={() => {
              if (isAuthorized) {
                handleReplyClick();
              } else {
                onReply(comment._id);
              }
            }}
          >
            Ответить
          </button>
        )}
      </div>
      {isReplying && isAuthorized && (
        <CommentForm onSubmit={handleSubmitReply} onCancel={onCancel} isReply={true}/>
      )}
      {!isAuthorized && isReplying && (
        <AuthHint/>
      )}
      {level < MAX_INDENT_LEVEL && Array.isArray(comment.children) && comment.children.length > 0 && (
        <>
          {comment.children.map(child => (
            <CommentItem
              key={String(child._id)}
              comment={child}
              onReply={onReply}
              onCancel={onCancel}
              onSend={onSend}
              activeFormTargetId={activeFormTargetId}
              isAuthorized={isAuthorized}
              user={user}
              level={level + 1}
            />
          ))}
        </>
      )}
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  onReply: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  activeFormTargetId: PropTypes.string,
  isAuthorized: PropTypes.bool,
  user: PropTypes.object,
  level: PropTypes.number,
};

export default memo(CommentItem);
