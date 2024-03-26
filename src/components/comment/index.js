import { memo, useEffect, useRef } from "react";
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
  t,
  lang,
  nesting,
  user
}) {
  const creator = comment.author.profile.name
  const cn = bem("Comment");
  // console.log(window.innerHeight);
  const formRef = useRef(null)


  useEffect(() => {
    if(formPosition === comment._id){
      console.log(formRef.current);
      window.scrollTo({
        left: 0,
        top: formRef.current.offsetTop - window.innerHeight + formRef.current.offsetHeight,
        behavior: 'smooth'
      })
    }
  }, [formPosition])
  return (
    <div className={cn()}>
      <div className={cn("upper")}>
        <strong className={user === creator ? cn("authedAuthor") : cn("author")}>{comment.author.profile.name}</strong>
        <span className={cn("date")}> {formatDate(comment.dateCreate, lang)} </span>
      </div>
      <div className={cn("body")}> {comment.text} </div>
      <a
        className={cn("footer")}
        onClick={() => {
          setFormPosition(comment._id)
        }}
      >
        {t("comments.answer")}
      </a>
      {comment.children.length ? (
        <ul className={ nesting < 10 ? cn("answers") : cn("deepAnswers")}>
          {comment.children.map((comment) => (
            <Comment
              user={user}
              nesting={nesting+1}
              formPosition={formPosition}
              setFormPosition={setFormPosition}
              key={comment._id}
              comment={comment}
              isAuth={isAuth}
              onUnAuth={onUnAuth}
              onAdd={onAdd}
              parentId={comment._id}
              article={article}
              t={t}
              lang={lang}
            />
          ))}
        </ul>
      ) : null}
      {formPosition === comment._id && (
        <CommentForm
          formRef={formRef}
          t={t}
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
