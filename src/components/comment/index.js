import { cn as bem } from "@bem-react/classname";
import React from "react";
import "./style.css";

function Comment({ comment, onReply }) {
  const cn = bem("Comment");
  return (
    <div
      style={{ marginLeft: comment.level <= 5 ? comment.level * 30 : 5 * 30 }}
      className={cn()}
    >
      <div className={cn("info")}>
        <div className={cn("author", { isAuthor: comment.isAuthor })}>
          {comment.author}
        </div>
        <div className={cn("date")}>{comment.date}</div>
      </div>
      <div className={cn("text")}>{comment.text}</div>
      <div className={cn("actions")}>
        <button onClick={() => onReply(comment._id)} className={cn("reply")}>
          Ответить
        </button>
      </div>
    </div>
  );
}

export default Comment;
