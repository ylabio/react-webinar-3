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
  t
}) {
  const cn = bem("CommentariesBlock");
  return (
    <div className="CommentariesBlock">
      <h2 className={cn("header")}>Комментарии ({count})</h2>
      {comments
        .filter((comment) => comment._id )
        .map((comment) => (
        <Comment
          onAdd={onAdd}
          article={article}
          formPosition={formPosition}
          setFormPosition={setFormPosition}
          key={comment._id}
          // TODO: Подумать 
          comment={{...comment}}
          isAuth={isAuth}
          onUnAuth={onUnAuth}
        />
      ))}
    </div>
  );
}

export default memo(CommentariesBlock);
