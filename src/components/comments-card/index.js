import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import CommentCard from "../comment-card";
import CommentForm from "../comment-form";

function CommentsCard({
  comments,
  count,
  t,
  lang,
  loggedIn,
  loginLink,
  onCreateComment,
  postId,
}) {
  const [commentFormId, setCommentFormId] = useState("");

  const handleOpenForm = (commentId) => {
    setCommentFormId(commentId);
  };

  const handleFormSubmit = (text) => {
    onCreateComment({
      parent: { _id: postId, _type: "article" },
      text,
    });
  };

  const cn = bem("CommentsCard");
  return (
    <div className={cn()}>
      <div className={cn("title")}>{`${t("comments.title")} (${count})`}</div>
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          t={t}
          lang={lang}
          loggedIn={loggedIn}
          loginLink={loginLink}
          handleOpenForm={handleOpenForm}
          commentFormId={commentFormId}
          onCloseForm={() => handleOpenForm("")}
          onCreateComment={onCreateComment}
        />
      ))}
      {!commentFormId && (
        <CommentForm
          t={t}
          loggedIn={loggedIn}
          loginLink={loginLink}
          type={"comment"}
          onSubmitForm={handleFormSubmit}
        />
      )}
    </div>
  );
}

CommentsCard.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
      dateCreate: PropTypes.string,
      author: PropTypes.object,
    })
  ).isRequired,
  count: PropTypes.number,
  t: PropTypes.func,
  lang: PropTypes.string,
  loggedIn: PropTypes.bool,
  loginLink: PropTypes.object,
  postId: PropTypes.string,
};

CommentsCard.defaultProps = {
  count: 0,
  loggedIn: false,
  t: (text) => text,
  loggedIn: false,
  loginLink: null,
  postId: "",
};

export default memo(CommentsCard);
