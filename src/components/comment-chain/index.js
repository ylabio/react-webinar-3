import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import CommentItem from '../comment-item';

function CommentChain({ comment, onReply, rootCommentId, depth = 0, locale }) {
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
      {comment.children?.length > 0 &&
        comment.children?.map(childComment => (
          <CommentChain
            key={childComment._id}
            comment={childComment}
            onReply={onReply}
            rootCommentId={rootCommentId}
            depth={depth + 1}
            locale={locale}
          />
        ))}
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
};

export default memo(CommentChain);
