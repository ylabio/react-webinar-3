import { memo } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import formatDate from "../../utils/format-date";
import CommentForm from "../comment-form";

function Comment({
  onAdd,
  comment,
  formPosition,
  setFormPosition,
  onUnAuth,
  isAuth,
  article,
}) {
  const cn = bem("Comment");
  return (
    <div className={cn()}>
      <div className={cn("upper")}>
        <strong className={cn("author")}>{comment.author.profile.name}</strong>
        <span className={cn("date")}> {formatDate(comment.dateCreate)} </span>
      </div>
      <div className={cn("body")}> {comment.text} </div>
      <div
        className={cn("footer")}
        onClick={() => setFormPosition(comment._id)}
      >
        Ответить
      </div>
      {comment.children.length ? (
        <ul className={cn("answers")}>
          {comment.children.map((comment) => (
            <Comment
              formPosition={formPosition}
              setFormPosition={setFormPosition}
              key={comment._id}
              comment={comment}
              isAuth={isAuth}
              onUnAuth={onUnAuth}
              onAdd={onAdd}
              parentId={comment._id}
              article={article}
            />
          ))}
        </ul>
      ) : null}
      {formPosition === comment._id && (
        <CommentForm
          onAdd={onAdd}
          parentId={comment._id}
          article={article}
          cancel={() => setFormPosition("main")}
          user={comment.author.profile.name}
          type={"comment"}
          isAuth={isAuth}
          onUnAuth={onUnAuth}
        />
      )}
    </div>
  );
}

export default memo(Comment);
