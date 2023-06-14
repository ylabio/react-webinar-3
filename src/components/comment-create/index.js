import { memo, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link, useLocation } from "react-router-dom";

const replyMap = {
  new: "article",
  reply: "comment",
};

function CommentCreate({
  showReplyBox = false,
  onCancelComment,
  onSendComment,
  text,
  isAuth,
  currentCommentId,
  commentId,
  type,
  articleId,
  t,
  inputRef,
  margin
}) {
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(true);
  const location = useLocation();

  const conditionForReply =
    type === "reply" && currentCommentId === commentId && !!showReplyBox;
  const conditionForNew = type === "new" && !showReplyBox;

  const idMap = {
    new: articleId,
    reply: commentId,
  };

  const onChangeInput = (e) => {
    setInput(e.target.value);
    e.target.value.trim().length === 0 ? setDisabled(true) : setDisabled(false)
  }

  const render = () => {
    if ((conditionForReply || conditionForNew) && isAuth) {
      return (
        <div ref={inputRef} style={{ marginLeft: `${margin}px` }}>
          <p className="text">{text}</p>
          <textarea
            className="textarea"
            type="textarea"
            onChange={(e) => onChangeInput(e)}
          ></textarea>
          <div className="buttons">
            {type === "reply" && (
              <button className="button_cancel" onClick={onCancelComment}>
                {t("cancel")}
              </button>
            )}
            <button
              disabled={disabled}
              onClick={(e) => onSendComment(input, replyMap[type], idMap[type])}
            >
              {t("send")}
            </button>
          </div>
        </div>
      );
    } else if (!isAuth && conditionForReply) {
      return (
          <div className="auth" style={{ marginLeft: `${margin}px`}}>
            <p>
              <Link state={{ back: location }} to="/login">{t("login")}</Link>, {t("to be able to reply")}.
            </p>
            {type === "reply" && (
              <button className="cancel" onClick={onCancelComment}>
                {t("cancel")}
              </button>
            )}
          </div>
      );
    } else if (!isAuth && conditionForNew) {
      return (
        <>
          <div className="auth">
            <p>
              <Link state={{ back: location }} to="/login">{t("login")}</Link>,{" "}
              {t("to be able to comment")}.
            </p>
            {type === "reply" && (
              <button className="cancel" onClick={onCancelComment}>
                {t("cancel")}
              </button>
            )}
          </div>
        </>
      );
    } else return null;
  };

  return <div className="CommentCreate">{render()}</div>;
}

CommentCreate.propTypes = {
  parentId: PropTypes.string,
  showReplyBox: PropTypes.bool,
  onCancelComment: PropTypes.func,
  onSendComment: PropTypes.func,
  text: PropTypes.string,
  isAuth: PropTypes.bool,
  currentCommentId: PropTypes.string,
  commentId: PropTypes.string,
  type: PropTypes.string.isRequired,
};

CommentCreate.defaultProps = {
  onCancelComment: () => {},
  onSendComment: () => {},
};

export default memo(CommentCreate);
