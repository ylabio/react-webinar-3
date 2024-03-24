import { memo, useCallback, useState } from "react";
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
            t={t}
          />
        </div>
      ))}

      {showComment && (
        <NewComment
          session={session}
          onSend={onSendComment}
          onClose={callbacks.closeReply}
          t={t}
        />
      )}
    </div>
  );
}

export default memo(CommentList);
