import PropTypes from "prop-types";
import CommentCard from "../comment-card";
import { Fragment, memo, useCallback } from "react";
import AddReplyForm from "../add-reply-form";
import './style.css';

function CommentsTree({
  comments,
  onReply,
  onOpenReplyForm,
  onCloseReplyForm,
  currentReplyFormId,
  count,
  isAuth,
  sessionId,
  onMessage
}) {

  const renders = {
    renderComment: useCallback((comment, parentLevel) => {
      const { _id, children } = comment;
      let level = parentLevel + 1;

      if (level > 9) {
        level = 9;
      }

      const hasChildren = children.length > 0;
      const renderChildren = hasChildren && (
        <Fragment>
          {children.map((childComment) => (
            <Fragment key={childComment._id}>
              {renders.renderComment(childComment, level)}
            </Fragment>
          ))}
        </Fragment>
      );

      return (
        <Fragment key={_id}>
          <CommentCard
            my={comment.author._id === sessionId}
            isAuth={isAuth}
            onOpen={onOpenReplyForm}
            onClose={onCloseReplyForm}
            level={level}
            data={comment}
          />
          {renderChildren}
          {currentReplyFormId === _id &&
            <AddReplyForm
             onMessage={onMessage}
             isAuth={isAuth}
             onSubmit={(value) => onReply(_id, value)}
             level={level} onClose={onCloseReplyForm}
             focus
            />
          }
        </Fragment>
      );
    }, [currentReplyFormId, isAuth, sessionId])
  };

  return (
    <div className="CommentsTree">
      <span className="CommentsTree-title">Комментариев ({count})</span>
      {comments.map((comment) => renders.renderComment(comment, 0))}
    </div>
  );
}

CommentsTree.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      text: PropTypes.string,
      author: PropTypes.shape({
        profile: PropTypes.shape({
          name: PropTypes.string
        })
      }),
      dateCreate: PropTypes.string,
      children: PropTypes.array
    })
  ),
  count: PropTypes.number,
  currentReplyFormId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null])
  ]),
  isAuth: PropTypes.bool,
  onReply: PropTypes.func,
  sessionId: PropTypes.string,
  onMessage: PropTypes.func
};

export default memo(CommentsTree);
