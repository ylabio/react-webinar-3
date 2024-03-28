import { cn as bem } from "@bem-react/classname";
import React, { forwardRef, useMemo, useState } from "react";
import "./style.css";

const CommentForm = forwardRef(function CommentForm(
  { onSubmit, onCancel, onLogin, isLoggedIn, label },
  ref
) {
  const [text, setText] = useState("");
  const isReply = onCancel !== undefined;

  const onSubmitForm = (e) => {
    e.preventDefault();
    onSubmit(text, isReply);
    setText("");
  };

  const disabled = useMemo(() => !/\S/.test(text), [text]);

  const cn = bem("CommentForm");
  return (
    <div ref={ref} className={cn("wrapper", { reply: isReply })}>
      {isLoggedIn ? (
        <form className={cn("form")} onSubmit={onSubmitForm}>
          <div className={cn("field")}>
            <label className={cn("label")}>{label}</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              name="text"
              className={cn("input")}
            />
          </div>
          <div className={cn("actions")}>
            <button
              disabled={disabled}
              type="submit"
              className={cn("submit-btn")}
            >
              Отправить
            </button>
            {isReply && (
              <button
                type="button"
                onClick={onCancel}
                className={cn("cancel-btn")}
              >
                Отменить
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className={cn("not-logged")}>
          <span className={cn("login")} onClick={onLogin}>
            Войдите
          </span>
          , чтобы иметь возможность {isReply ? "ответить" : "комментировать"}.{" "}
          {isReply && (
            <span className={cn("cancel")} onClick={onCancel}>
              Отмена
            </span>
          )}
        </div>
      )}
    </div>
  );
});

export default CommentForm;
