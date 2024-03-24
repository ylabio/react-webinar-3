import React, { useState, useCallback } from "react";
import LoginMessage from "../login-message";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const CommentNew = ({ session, onCreateNewComment, t }) => {
  const [text, setText] = useState("");
  const cn = bem("CommentNew");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onCreateNewComment(text);
      setText("");
    },
    [text, onCreateNewComment]
  );

  if (!session) {
    return <LoginMessage />;
  }

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h2 className={cn("title")}>Новый комментарий</h2>
      <textarea
        className={cn("text")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Текст комментария"
        autoFocus // для фокуса по умолчанию
      />
      <button
        className={cn("button")}
        type="submit"
        aria-label="Отправить комментарий"
      >
        Отправить
      </button>
    </form>
  );
};

export default CommentNew;
