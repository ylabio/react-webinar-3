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
    depth = 0,
  }) => {
    const cn = bem("Comment");
    const isCurrentUser = currentUserId && comment.author._id === currentUserId;
    const maxNestingDepth = 10;
    const marginLeft = depth <= maxNestingDepth ? `30px` : "0px";

    const nested = (comment.children || []).map((item) => (
      <div key={item._id} style={{ marginLeft }}>
        <Comment
          comment={item}
          session={session}
          currentUserId={currentUserId}
          onOpenReply={onOpenReply}
          onCloseReply={onCloseReply}
          onAddReplyComment={onAddReplyComment}
          t={t}
          depth={depth + 1}
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
          onClick={() => onOpenReply(comment._id)}
        >
          Ответить
        </button>
        {comment.reply && (
          <CommentReply
            session={session}
            onCancel={() => onCloseReply(comment._id)}
            onAddReplyComment={(text) => onAddReplyComment(comment._id, text)}
            t={t}
          />
        )}
        {nested}
      </div>
    );
  }
);

export default Comment;
