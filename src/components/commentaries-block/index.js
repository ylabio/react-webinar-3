import { memo } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import Comment from "../comment";

function CommentariesBlock({
  article,
  comments,
  count,
  formPosition,
  setFormPosition,
  isAuth,
  onUnAuth,
  onAdd,
  t,
  lang,
  user
}) {
  const cn = bem("CommentariesBlock");
  const nesting = 0;
  return (
    <div className="CommentariesBlock">
      <h2 className={cn("header")}>
        {t("comments.title")} ({count})
      </h2>
      {comments
        .filter((comment) => comment._id)
        .map((comment) => (
          <Comment
            user={user}
            nesting={nesting + 1}
            onAdd={onAdd}
            article={article}
            formPosition={formPosition}
            setFormPosition={setFormPosition}
            key={comment._id}
            comment={comment}
            isAuth={isAuth}
            onUnAuth={onUnAuth}
            t={t}
            lang={lang}
          />
        ))}
    </div>
  );
}

export default memo(CommentariesBlock);
