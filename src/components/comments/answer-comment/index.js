import React, { memo } from "react";
import "./style.css";
import PropTypes from "prop-types";
import FormComments from "../form-comments";
import AuthAlert from "../auth-alert";
import AutoScroll from "../../../containers/auto-scroll";

function AnswerComment({
  isAuth,
  id,
  t,
  addComment,
  onCloseForm,
  children,
  paddingLeft,
}) {
  return (
    <div
      className="AnswerComment"
      style={{
        paddingLeft: `${paddingLeft}px`,
      }}
    >
      {isAuth ? (
        <AutoScroll>
          <FormComments
            id={id}
            label={t("comment.newAnswer")}
            labelBtn={t("comment.send")}
            cb={addComment}
            labelBtn2={t("comment.cancel")}
            cb2={onCloseForm}
          />
        </AutoScroll>
      ) : (
        <AutoScroll>
          <AuthAlert
            text={t("comment.textAlertComment")}
            labelBtn={t("comment.cancel")}
            cb={onCloseForm}
          >
            {children}
          </AuthAlert>
        </AutoScroll>
      )}
    </div>
  );
}

AnswerComment.propTypes = {
  isAuth: PropTypes.bool,
  id: PropTypes.string,
  t: PropTypes.func,
  addComment: PropTypes.func,
  onCloseForm: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.oneOf(["comment", "article"]),
};

AnswerComment.defaultProps = {
  isAuth: false,
};

export default memo(AnswerComment);
