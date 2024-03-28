import { cn as bem } from "@bem-react/classname";
import React from "react";
import dateFormat from "../../utils/date-format";
import CommentForm from "../comment-form";
import "./style.css";

const MAX_NESTING = 10;

function Comment({
  data,
  currentUserId,
  isLoggedIn,
  selectedCommentId,
  nesting = 1,
  onSubmit,
  onReply,
  onCancel,
  onLogin,
}) {
  const cn = bem("Comment");
  return (
    <div className={cn({ nested: nesting > 1 && nesting <= MAX_NESTING })}>
      <div className={cn("info")}>
        <div
          className={cn("user", { author: data.author._id === currentUserId })}
        >
          {data.author?.profile?.name}
        </div>
        <div className={cn("date")}>{dateFormat(data.createdAt)}</div>
      </div>
      <div className={cn("text")}>{data.text}</div>
      <div className={cn("actions")}>
        <button onClick={() => onReply(data._id)} className={cn("btn-reply")}>
          Ответить
        </button>
      </div>
      {data.children?.length > 0 && (
        <div className={cn("children")}>
          {data.children.map((child) => (
            <Comment
              key={child._id}
              data={child}
              currentUserId={currentUserId}
              isLoggedIn={isLoggedIn}
              selectedCommentId={selectedCommentId}
              onSubmit={onSubmit}
              onReply={onReply}
              onCancel={onCancel}
              onLogin={onLogin}
              nesting={nesting + 1}
            />
          ))}
        </div>
      )}
      {selectedCommentId === data._id && (
        <CommentForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          onLogin={onLogin}
          isLoggedIn={isLoggedIn}
          label="Новый ответ"
        />
      )}
    </div>
  );
}

export default Comment;
