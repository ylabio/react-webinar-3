import { memo, useRef } from "react";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SideLayout from "../../components/side-layout";
import "./style.css";

function CommentForm({
  formId,
  type,
  sessionExists,
  pathname,
  onCloseForm,
  onCommentSend,
}) {
  const cn = bem("CommentForm");
  const commentText = useRef();

  const callbacks = {
    onCommentSend: (e) => {
      e.preventDefault();

      if (commentText.current.value.trim() !== "") {
        onCommentSend(formId, type, commentText.current.value);
        commentText.current.value = "";
        if (type === "comment") onCloseForm();
      } else {
        commentText.current.value = "";
      }
    },
  };

  const renders = {
    // Варианты формы без авторизации
    noAuthForm: (
      <div className={cn("auth")}>
        <Link className={cn("login")} to={"/login"} state={{ back: pathname }}>
          Войдите
        </Link>
        <span>, чтобы иметь возможность </span>
        {type === "article" ? (
          <span>комментировать</span>
        ) : (
          <>
            <span>ответить. </span>
            <span className={cn("cancel")} onClick={onCloseForm}>
              Отмена
            </span>
          </>
        )}
      </div>
    ),

    // Варианты кнопок для авторизованной формы
    authButtons:
      type === "article" ? (
        <button type="submit" className={cn("send")}>
          Отправить
        </button>
      ) : (
        <>
          <button type="submit" className={cn("send")}>
            Отправить
          </button>
          <button onClick={onCloseForm}>Отмена</button>
        </>
      ),
  };

  return (
    <div
      id="commentForm"
      className={cn("")}
      style={type === "article" ? { paddingLeft: "40px" } : {}}
    >
      {sessionExists ? (
        <form className={cn("form")} onSubmit={callbacks.onCommentSend}>
          <h5>{type === "article" ? "Новый комментарий" : "Новый ответ"}</h5>
          <textarea
            ref={commentText}
            title="comment"
            className={cn("input")}
            type="text"
          />

          <SideLayout side="start" padding="no">
            {renders.authButtons}
          </SideLayout>
        </form>
      ) : (
        renders.noAuthForm
      )}
    </div>
  );
}

CommentForm.PropTypes = {
  formId: PropTypes.string,
  type: PropTypes.string,
  session: PropTypes.string,
  pathname: PropTypes.string,
  onCloseForm: PropTypes.func,
  onCommentSend: PropTypes.func,
};

CommentForm.defaultProps = {
  formId: "",
  type: "",
  session: false,
  pathname: "/",
  onCloseForm: () => {},
  onCommentSend: () => {},
};

export default memo(CommentForm);
