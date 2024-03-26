import React, { useState, useCallback } from "react";
import LoginMessage from "../login-message";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const CommentReply = ({ session, onCancel, onAddReplyComment }) => {
  const [text, setText] = useState("");
  const cn = bem("CommentReply");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onAddReplyComment(text);
      setText("");
    },
    [text, onAddReplyComment]
  );

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  if (!session) {
    return <LoginMessage onCancel={handleCancel} reply={true} />;
  }

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h2 className={cn("title")}>Новый ответ</h2>
      <textarea
        className={cn("text")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Текст ответа"
        required
      />
      <div className={cn("wrapper")}>
        <button type="submit" aria-label="Отправить ответ">
          Отправить
        </button>
        <button
          type="button"
          onClick={handleCancel}
          aria-label="Отменить ответ"
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default CommentReply;
