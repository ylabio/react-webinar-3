import { memo, useState } from "react";
import PropTypes, { string } from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom/dist";

function CommentForm({
  loggedIn,
  t,
  loginLink,
  onCloseForm,
  onSubmitForm,
  type,
}) {
  const cn = bem("CommentForm");
  const [commentText, setCommentText] = useState("");

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm(commentText);
  };

  return (
    <div className={cn()}>
      {loggedIn ? (
        <form className={cn("form")}>
          <div className={cn("title")}>
            {t("comment.new")} {type === "comment" && t("comment.comment")}
            {type === "reply" && t("comment.newReply")}
          </div>
          <textarea
            className={cn("textarea")}
            value={commentText}
            onChange={handleCommentTextChange}
            required
          />
          <div className={cn("controls")}>
            <button onClick={handleSubmit} disabled={!commentText}>{t("comment.send")}</button>
            {onCloseForm && (
              <button onClick={onCloseForm} type="button">
                {t("comment.cancel")}
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className={cn("logout")}>
          <Link to={loginLink}>{t("comment.login")}</Link>,{" "}
          {type === "comment" && t("comment.loginForComment")}
          {type === "reply" && t("comment.loginForReply")}
          {". "}
          {onCloseForm && (
            <span onClick={onCloseForm} className={cn("cancel")}>
              {t("comment.cancel")}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

CommentForm.propTypes = {
  type: PropTypes.oneOf(["comment", "reply"]),
  loggedIn: PropTypes.bool,
  t: PropTypes.func,
  loginLink: PropTypes.string,
  onCloseForm: PropTypes.func,
  onSubmitForm: PropTypes.func,
};

CommentForm.defaultProps = {
  type: "comment",
  loggedIn: false,
  t: (text) => text,
  onCloseForm: undefined,
  onSubmitForm: () => {},
};

export default memo(CommentForm);
