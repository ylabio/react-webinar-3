import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Comment from "../comment";

import "./style.css";
import Answer from "../../containers/answer";

function CommentsContainer({ count, comments, userId, exist, answerId, showAnswerForm, onCancel, onAnswer, onSend }) {
  const cn = bem("CommentContainer");

  return (
    <div className={cn()}>
      <h3 className={cn("title")}>Комментарии ({count})</h3>
      <div className={cn("wrapper")}>
        {comments.map((comment) => {
          return (
            <Comment
              comment={comment}
              userId={userId}
              key={comment._id}
              answerId={answerId}
              component={
                <Answer exist={exist} onCancel={onCancel} type={"comment"} onSend={onSend}/>
              }
              onAnswer={onAnswer}
              answers={comment.children}
            />
          );
        })}
      </div>
      <div>{showAnswerForm && <Answer exist={exist} onCancel={onCancel} onSend={onSend} />}</div>
    </div>
  );
}

export default memo(CommentsContainer);

CommentsContainer.propTypes = {
  count: PropTypes.number,
  comments: PropTypes.array,
  exist: PropTypes.bool,
};

CommentsContainer.defaultProps = {
  count: 0,
  comments: [],
  exist: false,
};
