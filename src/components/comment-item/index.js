import { memo, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import dateFormat from "../../utils/date-format";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./style.css";

function CommentItem({
  id,
  name,
  dateCreate,
  text,
  level,
  setCommentAnserVisible,
  sentComment,
  isFormVisible,
  isExists,
  currentUser,
  lastChild,
}) {
  const [textValue, setTextValue] = useState("");
  useEffect(() => {
    setTextValue('');
  }, []);
  const navigate = useNavigate();
  const location = useLocation();

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
    onOpenCommentArea: useCallback(() => {
      setCommentAnserVisible(lastChild);
    }, [id, setCommentAnserVisible]),

    onHandleCancel: useCallback(() => {
      setCommentAnserVisible(false);
    }, [setCommentAnserVisible]),

    handleSendComment: useCallback(() => {
      sentComment(textValue, "comment", id);
      setCommentAnserVisible(false);
    }, [textValue, sentComment, id]),
  };

  const cn = bem("CommentItem");
  return (
    <div
      className={cn()}
      style={{ marginLeft: `${(level < 15 ? level : 15) * 30}px` }}
    >
      <div className={cn("info")}>
        <span
          className={currentUser === name ? cn("title-current") : cn("title")}
        >
          {name}
        </span>
        <span className={cn("date")}>{dateFormat(dateCreate)}</span>
      </div>
      <p className={cn("text")}>{text}</p>
      <button className={cn("btn")} onClick={callbacks.onOpenCommentArea}>
        Ответить
      </button>
      {isExists ? (
        <div
          style={{ display: isFormVisible ? "flex" : "none" }}
          className={lastChild === id ? cn("form--shift") : cn("form")}
        >
          <span className={cn("form-title")}>{"Новый ответ"}</span>
          <textarea
            className={cn("form-comment")}
            onChange={(e) => setTextValue(e.target.value)}
          ></textarea>
          <div>
            <button className={cn("form-btn")} onClick={callbacks.handleSendComment}>
              Отправить
            </button>
            <button onClick={callbacks.onHandleCancel}>Отмена</button>
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
          , чтобы иметь возможность ответить.
          <span
            className={cn("cancelAuth")}
            role="button"
            tabIndex="0"
            onClick={callbacks.onHandleCancel}
          >
            Отмена
          </span>
        </div>
      )}
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dateCreate: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  setCommentAnserVisible: PropTypes.func.isRequired,
  sentComment: PropTypes.func.isRequired,
  isFormVisible: PropTypes.bool.isRequired,
  isExists: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

export default memo(CommentItem);
