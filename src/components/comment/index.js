import React, { memo, useCallback } from "react";
import formatCommentDate from "../../utils/date-comment";
import CommentReply from "../comment-reply";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Comment = memo(
  ({
    comment,
    session,
    currentUserId,
    onOpenReply,
    onCloseReply,
    onAddReplyComment,
    t,
  }) => {
    const cn = bem("Comment");
    const isCurrentUser = currentUserId && comment.author._id === currentUserId;

    const handleOpenReply = useCallback(() => {
      onOpenReply(comment._id);
    }, [onOpenReply, comment._id]);

    const handleCancel = useCallback(() => {
      onCloseReply(comment._id);
    }, [onCloseReply, comment._id]);

    const handleAddReplyComment = useCallback(
      (text) => {
        onAddReplyComment(comment._id, text);
      },
      [onAddReplyComment, comment._id]
    );

    const nested = (comment.children || []).map((item) => (
      <div key={item._id} style={{ marginLeft: "30px" }}>
        <Comment
          comment={item}
          session={session}
          currentUserId={currentUserId}
          onOpenReply={onOpenReply}
          onCloseReply={onCloseReply}
          onAddReplyComment={onAddReplyComment}
          t={t}
        />
      </div>
    ));

    return (
      <div className={cn()}>
        <div className={cn("head-wrapper")}>
          <div className={cn("author", { currentUser: isCurrentUser })}>
            {comment.author.profile.name}
          </div>
          <div className={cn("date")}>
            {formatCommentDate(comment.dateCreate)}
          </div>
        </div>
        <div className={cn("text")}>{comment.text}</div>
        <button
          className={cn("button")}
          type="button"
          onClick={handleOpenReply}
        >
          Ответить
        </button>
        {comment.reply && (
          <CommentReply
            session={session}
            onCancel={handleCancel}
            onAddReplyComment={handleAddReplyComment}
            t={t}
          />
        )}
        {nested}
      </div>
    );
  }
);

export default Comment;
