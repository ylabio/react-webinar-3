import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import CommentForm from '../comment-form';
import CommentItem from '../comment-item';

function CommentChain({
  comment,
  onReply,
  handleSubmitComment,
  handleResetForm,
  replyTargetId,
  rootCommentId,
  depth = 0,
  exists,
  locale,
  depthLimit = 10,
}) {
  const cn = bem('CommentChain');

  return (
    <div className={cn()}>
      <CommentItem
        comment={comment}
        onReply={onReply}
        rootCommentId={rootCommentId}
        depth={depth}
        locale={locale}
      />
      {comment.children?.map(childComment => (
        <CommentChain
          key={childComment._id}
          comment={childComment}
          onReply={onReply}
          rootCommentId={rootCommentId}
          depth={depth <= depthLimit ? depth + 1 : depth}
          locale={locale}
          replyTargetId={replyTargetId}
          handleSubmitComment={handleSubmitComment}
          handleResetForm={handleResetForm}
          exists={exists}
          depthLimit={depthLimit}
        />
      ))}
      {rootCommentId === comment._id && (
        <CommentForm
          parentCommentId={replyTargetId}
          onSubmit={handleSubmitComment}
          onReset={handleResetForm}
          isAuth={exists}
          depth={depth <= depthLimit ? depth + 1 : depth}
          t={locale.t}
        />
      )}
    </div>
  );
}

CommentChain.propTypes = {
  comment: PropTypes.shape({
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
  rootCommentId: PropTypes.string,
  onReply: PropTypes.func.isRequired,
  depth: PropTypes.number,
  handleSubmitComment: PropTypes.func,
  handleResetForm: PropTypes.func,
  replyTargetId: PropTypes.string,
  exists: PropTypes.bool,
  depthLimit: PropTypes.number,
  locale: PropTypes.shape({
    t: PropTypes.func,
    lang: PropTypes.string,
  }),
};

export default memo(CommentChain);
