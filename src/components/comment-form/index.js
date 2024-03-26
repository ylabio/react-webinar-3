import { memo, useRef } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import LoginToLabel from "../login-to-label";
function CommentForm({ isAuth, onUnAuth, type, user = null, cancel, onAdd, parentId, article, t, formRef }) {
  const cn = bem("CommentForm");
  const textRef = useRef(null)
  
  return (
    <div ref={formRef}>
      {isAuth ? (
        <div className={cn()}>
          <div className={cn("title")}>{type === "article" ? t("comments.newComment") : t("comments.newAnswer")}</div>
          <textarea
            placeholder={type === 'article' ? "Текст" : `Мой ответ для ${user}` }
            className={cn("body")}
            ref={textRef}
            >
              
          </textarea>
          <button
          className={cn("send")}
          onClick={() => {
            if(textRef.current.value.trim() !== ''){
              onAdd(parentId, type, textRef.current.value, article)
            } else{
              console.log("Empty");
            }
            textRef.current.value=""
          }}
          > {t("comments.send")} </button>
          {type === "comment" && <button onClick={cancel}>{t("comments.cancel")}</button>}
        </div>
      ) : (
        <LoginToLabel t={t} cancel={cancel} type={type} onClick={onUnAuth} />
      )}
    </div>
  );
}

export default memo(CommentForm);
