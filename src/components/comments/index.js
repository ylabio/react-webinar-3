import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React, { memo } from "react";
import AuthAlert from "../auth-alert";
import Comment from "../comment";
import CommentForm from "../comment-form";
import "./style.css";

function Comments(props) {
  const cn = bem("Comments");
  return (
    <div className={cn()}>
      <h3 className={cn("title")}>Комментарии ({props.amount})</h3>
      <div className={cn("list")}>
        {props.items.map((comment) => (
          <div key={comment._id} style={{ marginLeft: comment.level * 30 }}>
            <Comment comment={comment} onReply={props.onReply} />
            {props.isValidSession && props.activeReplyId === comment._id && (
              <CommentForm
                isReply
                onSubmit={props.onSubmit}
                onCancel={props.onCancel}
              />
            )}
            {!props.isValidSession && props.activeReplyId === comment._id && (
              <AuthAlert
                onLogin={props.onLogin}
                onCancel={props.onCancel}
                isReply
              />
            )}
          </div>
        ))}
      </div>
      {props.isValidSession && !props.activeReplyId && (
        <CommentForm onSubmit={props.onSubmit} />
      )}
      {!props.isValidSession && !props.activeReplyId && (
        <AuthAlert isReply={false} onLogin={props.onLogin} />
      )}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.array,
  amount: PropTypes.number,
};

Comments.defaultProps = {
  items: [],
  amount: 0,
};

export default memo(Comments);
