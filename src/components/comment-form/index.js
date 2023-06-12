import { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";

function CommentForm({ isFormVisible, sentComment, isExists }) {
  const [textComment, setTextComment] = useState("");

  const onHandleSentComment = () => {
    sentComment(textComment);
    setTextComment("");
  };

  const navigate = useNavigate();
  const location = useLocation();

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  const cn = bem("CommentForm");
  return (
    <>
      {isExists ? (
        <div
          style={{ display: isFormVisible ? "flex" : "none" }}
          className={cn()}
        >
          <label htmlFor="commentText" className={cn("title")}>
            {"Новый комментарий"}
          </label>
          <textarea
            id="commentText"
            className={cn("comment")}
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
          ></textarea>
          <div>
            <button
              className={cn("btn")}
              onClick={onHandleSentComment}
              tabIndex="0"
            >
              Отправить
            </button>
          </div>
        </div>
      ) : (
        <div
          className={cn("checkAuth")}
          style={{ display: isFormVisible ? "flex" : "none" }}
        >
          <span
            onClick={callbacks.onSignIn}
            className={cn("signInLink")}
            role="button"
            tabIndex="0"
          >
            Войдите
          </span>
          , чтобы иметь возможность комментировать.
        </div>
      )}
    </>
  );
}

CommentForm.propTypes = {
  isFormVisible: PropTypes.bool.isRequired,
  sentComment: PropTypes.func.isRequired,
  isExists: PropTypes.bool.isRequired,
};

export default memo(CommentForm);
