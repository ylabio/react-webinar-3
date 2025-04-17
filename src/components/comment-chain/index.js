import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import CommentItem from '../comment-item';

function CommentChain({
  comments,
  onReply,
  isAuth,
  activeFormTargetId,
  handleSubmitComment,
  handleResetForm,
  depth = 0,
}) {
  const cn = bem('CommentChain');
  return (
    <>
      {comments.map(comment => (
        <div key={comment._id} className={cn()}>
          <CommentItem
            comment={comment}
            onReply={onReply}
            isAuth={isAuth}
            depth={depth}
            activeFormTargetId={activeFormTargetId}
            handleSubmitComment={handleSubmitComment}
            handleResetForm={handleResetForm}
          />
          {comment.children?.length > 0 && (
            <CommentChain
              comments={comment.children}
              onReply={onReply}
              isAuth={isAuth}
              activeFormTargetId={activeFormTargetId}
              handleSubmitComment={handleSubmitComment}
              handleResetForm={handleResetForm}
              depth={depth + 1}
            />
          )}
        </div>
      ))}
    </>
  );
}

CommentChain.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.object,
      text: PropTypes.string,
      dateCreate: PropTypes.string,
      _id: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
      ),
    }),
  ).isRequired,
  onReply: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  handleSubmitComment: PropTypes.func.isRequired,
  handleResetForm: PropTypes.func.isRequired,
  depth: PropTypes.number,
  activeFormTargetId: PropTypes.string,
};

export default memo(CommentChain);
