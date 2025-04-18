import { memo } from 'react';
import CommentItem from '../comment-item';
import CommentForm from '../comment-form';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import LoginPrompt from '../login-prompt';

function CommentList({
  comments = [],
  onReply,
  replyTo,
  isAuth,
  onSubmit,
  articleId,
  showLoginForComment,
  replyText,
  onReplyTextChange,
}) {
  const cn = bem('CommentsList');

  const buildCommentTree = (parentId = null) => {
    return comments
      .filter(comment =>
        parentId ? comment.parent._id === parentId : comment.parent._id === articleId,
      )
      .map(comment => ({
        ...comment,
        replies: buildCommentTree(comment._id),
      }));
  };

  const commentTree = buildCommentTree();

  const renderComments = (nodes, level = 0) => {
    return nodes.map(node => (
      <div key={node._id} className={cn('item')} style={{ marginLeft: `${level * 40}px` }}>
        <CommentItem
          comment={node}
          onReply={onReply}
          isReplying={replyTo === node._id}
          isAuth={isAuth}
          level={level}
          showLoginPrompt={showLoginForComment === node._id}
        />

        {replyTo === node._id && isAuth && (
          <div className={cn('reply-form')}>
            <CommentForm
              onSubmit={text => onSubmit(text, node._id, 'comment')}
              onCancel={() => onReply(null)}
              title="Новый ответ"
              placeholder={`Мой ответ для ${node.author?.profile?.name || 'пользователя'}`}
              value={replyText}
              onChange={onReplyTextChange}
            />
          </div>
        )}

        {node.replies && renderComments(node.replies, level + 1)}
      </div>
    ));
  };

  return (
    <div className="Comments">
      <h2>Комментарии ({comments.length})</h2>
      <div className={cn()}>{commentTree.length > 0 && renderComments(commentTree)}</div>

      {!isAuth && !showLoginForComment && (
        <LoginPrompt text="чтобы иметь возможность комментировать" />
      )}
    </div>
  );
}

export default memo(CommentList);
