import { memo } from 'react';
import CommentItem from '../comment-item';
import CommentForm from '../comment-form';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import LoginPrompt from '../login-prompt';

function CommentList({
  comments = [],
  isAuth,
  onSubmit,
  onReply,
  replyTo,
  replyText,
  onReplyTextChange,
  showLoginForComment,
  currentUser,
}) {
  const cn = bem('CommentsList');

  const renderComments = (nodes, level = 0) => {
    return nodes.map(node => {
      const hasReplies = node.children && node.children.length > 0;
      const isMaxLevel = level >= 7;
      const marginLeft = isMaxLevel ? 0 : level * 40;

      return (
        <div key={node._id} className={cn('item')}>
          <div style={{ marginLeft: `${marginLeft}px` }}>
            <CommentItem
              comment={node}
              onReply={onReply}
              isReplying={replyTo === node._id}
              isAuth={isAuth}
              level={level}
              showLoginPrompt={showLoginForComment === node._id}
              currentUser={currentUser}
            />
          </div>

          {hasReplies && renderComments(node.children, level + 1)}

          {(replyTo === node._id || showLoginForComment === node._id) && (
            <div
              className={cn(replyTo === node._id ? 'reply-form' : 'login-prompt')}
              style={{ marginLeft: `${(level + 1) * 40}px` }}
              ref={el => {
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              {isAuth ? (
                <CommentForm
                  onSubmit={text => onSubmit(text, node._id, 'comment')}
                  onCancel={() => onReply(null)}
                  title="Новый ответ"
                  placeholder={`Мой ответ для ${node.author?.profile?.name || 'пользователя'}`}
                  value={replyText}
                  onChange={onReplyTextChange}
                />
              ) : (
                <LoginPrompt text="чтобы иметь возможность комментировать" />
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="Comments">
      <h2>
        Комментарии (
        {(function countComments(items) {
          return items.reduce((count, comment) => {
            return count + 1 + (comment.children ? countComments(comment.children) : 0);
          }, 0);
        })(comments)}
        )
      </h2>
      <div className={cn()}>{comments.length > 0 && renderComments(comments)}</div>

      {!isAuth && !showLoginForComment && (
        <LoginPrompt text="чтобы иметь возможность комментировать" />
      )}
    </div>
  );
}

export default memo(CommentList);
