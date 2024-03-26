import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import Comment from "../comment";
import CommentNew from "../comment-new";
import "./style.css";

const CommentList = memo(
  ({
    comments,
    count,
    userId,
    session,
    onOpenReply,
    onCloseReply,
    onCreateNewComment,
    onAddReplyComment,
    showCommentForm = true,
    t,
  }) => {
    const cn = bem("CommentList");

    return (
      <div className={cn()}>
        <h2 className={cn("title")}>Комментарии ({count})</h2>
        {comments.map((item) => (
          <React.Fragment key={item._id}>
            <Comment
              comment={item}
              session={session}
              currentUserId={userId}
              onOpenReply={onOpenReply}
              onCloseReply={onCloseReply}
              onAddReplyComment={onAddReplyComment}
              t={t}
            />
          </React.Fragment>
        ))}

        {showCommentForm && (
          <CommentNew
            session={session}
            onCreateNewComment={onCreateNewComment}
            t={t}
          />
        )}
      </div>
    );
  }
);

export default CommentList;
