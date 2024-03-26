import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Comment from "../comment";
import NewComment from "../new-comment";

function CommentList({
  list,
  count,
  onOpenReply,
  onCloseReply,
  onSendReply,
  onSendComment,
  session,
  pathname,
  t,
}) {
  const [showComment, setShowComment] = useState(true);

  const callbacks = {
    openReply: useCallback((_id) => {
      setShowComment(false);
      onOpenReply(_id);
    }),
    closeReply: useCallback((_id) => {
      setShowComment(true);
      onCloseReply(_id);
    }),
  };

  return (
    <div className="CommentList">
      <div className="CommentList-header">
        {t("comments.count")} ({count})
      </div>

      {list.map((item) => (
        <div key={item._id}>
          <Comment
            item={item}
            session={session}
            onOpenReply={callbacks.openReply}
            onCloseReply={callbacks.closeReply}
            onSendReply={onSendReply}
            pathname={pathname}
            t={t}
          />
        </div>
      ))}

      {showComment && (
        <NewComment
          session={session.exists}
          onSend={onSendComment}
          onClose={callbacks.closeReply}
          pathname={pathname}
          t={t}
        />
      )}
    </div>
  );
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  count: PropTypes.number,
  onOpenReply: PropTypes.func,
  onCloseReply: PropTypes.func,
  onSendReply: PropTypes.func,
  onSendComment: PropTypes.func,
  session: PropTypes.shape({ exists: PropTypes.bool }).isRequired,
  t: PropTypes.func,
};

CommentList.defaultProps = {
  onOpenReply: () => {},
  onCloseReply: () => {},
  onSendReply: () => {},
  onSendComment: () => {},
  t: (text) => text,
};

export default memo(CommentList);
