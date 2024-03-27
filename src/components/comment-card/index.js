import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import formatDate from "../../utils/format-date";
import CommentForm from "../comment-form";

function CommentCard({
  comment,
  t,
  lang,
  loggedIn,
  loginLink,
  commentFormId,
  handleOpenForm,
  onCloseForm,
  onCreateComment,
  mine
}) {
  const cn = bem("CommentCard");

  const handleFormSubmit = (text) => {
    onCreateComment({
      parent: {_id:  comment._id, "_type":  "comment"},
      text
    })
  }

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <div className={cn("title")}>
          <span className={cn("author", {mine})}>{comment.author?.profile.name}</span>
          <span className={cn("date")}>{formatDate(comment.dateCreate, lang)}</span>
          {comment.level}
        </div>
        <div className={cn("text")}>{comment.text}</div>
        <div
          className={cn("reply")}
          onClick={() => handleOpenForm(comment._id)}
        >
          {t("comment.reply")}
        </div>
        {commentFormId === comment._id && (
          <CommentForm
            t={t}
            loggedIn={loggedIn}
            loginLink={loginLink}
            onCloseForm={onCloseForm}
            type={"reply"}
            onSubmitForm={handleFormSubmit}
          />
        )}
      </div>
      <div className={cn("answers")}>
        {comment.children.map((comment) => (
          <CommentCard
            key={comment._id}
            loggedIn={loggedIn}
            comment={comment}
            t={t}
            lang={lang}
            loginLink={loginLink}
            commentFormId={commentFormId}
            handleOpenForm={handleOpenForm}
            onCloseForm={() => handleOpenForm("")}
            onCreateComment={onCreateComment}
            mine={mine}
          />
        ))}
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.object,
    children: PropTypes.array,
  }).isRequired,
  loginLink: PropTypes.object,
  loggedIn: PropTypes.bool,
  t: PropTypes.func,
  lang: PropTypes.string,
  mine: PropTypes.bool
};

CommentCard.defaultProps = {
  loggedIn: false,
  t: (text) => text,
  mine: false
};

export default memo(CommentCard);
