import { cn as bem } from "@bem-react/classname";
import React, { forwardRef } from "react";
import "./style.css";

const CommentForm = forwardRef(function CommentForm(
  { onSubmit, onCancel, onLogin, isLoggedIn, label },
  ref
) {
  const isReply = onCancel !== undefined;

  const cn = bem("CommentForm");
  return (
    <div ref={ref} className={cn("wrapper", { reply: isReply })}>
      {isLoggedIn ? (
        <form className={cn("form")} onSubmit={onSubmit}>
          <div className={cn("field")}>
            <label className={cn("label")}>{label}</label>
            <textarea name="text" className={cn("input")} />
          </div>
          <div className={cn("actions")}>
            <button type="submit" className={cn("submit-btn")}>
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
