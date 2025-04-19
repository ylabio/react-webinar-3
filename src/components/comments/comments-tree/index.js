import { memo } from 'react';
import CommentItem from '../comment-item';
import './style.css';

function CommentsTree({
  comments,
  onReply,
  activeCommentId,
  resetActiveComment,
  sessionExists,
  createComment,
  profileName,
  }) {
  return (
    <ul className="CommentsTree-list">
      {comments.map(comment => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onReply={onReply}
          activeCommentId={activeCommentId}
          resetActiveComment={resetActiveComment}
          sessionExists={sessionExists}
          createComment={createComment}
          profileName={profileName}
        />
      ))}
    </ul>
  );
}

export default memo(CommentsTree);
