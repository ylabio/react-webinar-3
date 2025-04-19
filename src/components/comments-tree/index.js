import { memo } from 'react';
import PropTypes from 'prop-types';
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

CommentsTree.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      level: PropTypes.number,
    }),
  ).isRequired,
  onReply: PropTypes.func.isRequired,
  activeCommentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  resetActiveComment: PropTypes.func.isRequired,
  sessionExists: PropTypes.bool.isRequired,
  createComment: PropTypes.func.isRequired,
};

export default memo(CommentsTree);
