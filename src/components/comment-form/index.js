import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import SideLayout from "../../components/side-layout";
import "./style.css";

function CommentForm({ offset = 1, type, session, onCancelForm }) {
  const cn = bem("CommentForm");
  console.log(session);
  return (
    <div
      className={cn("")}
      style={type === "article" ? { paddingLeft: "40px" } : {}}
    >
      {session ? (
        <form className={cn("form")} onSubmit="">
          <h5>{type === "article" ? "Новый комментарий" : "Новый ответ"}</h5>
          <textarea title="comment" className={cn("input")} type="text" />
          <SideLayout side="start" padding="no">
            {type === "article" ? (
              <button type="submit" className={cn("send")}>
                Отправить
              </button>
            ) : (
              <>
                <button type="submit" className={cn("send")}>
                  Отправить
                </button>
                <button onClick={onCancelForm}>Отмена</button>
              </>
            )}
          </SideLayout>
        </form>
      ) : (
        <div className={cn("auth")}>
          <Link className={cn("login")} to={"/login"}>
            Войдите
          </Link>
          <span>, чтобы иметь возможность комментировать</span>
        </div>
      )}
    </div>
  );
}

export default memo(CommentForm);
