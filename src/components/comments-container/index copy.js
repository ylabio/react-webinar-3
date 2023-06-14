import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Comment from "../comment";

import "./style.css";
import Answer from "../../containers/answer";

function CommentsContainer({ count, comments, exist, id, show, onCancel, onAnswer }) {
  const cn = bem("CommentContainer");

  return (
    <div className={cn()}>
      <h3 className={cn("title")}>Комментарии ({count})</h3>
      <div className={cn("wrapper")}>
        {comments.map((comment) => {
          return (
            <Comment
              comment={comment}
              key={comment._id}
              id={id}
              component={
                <Answer exist={exist} onCancel={onCancel} type={"answer"} />
              }
              onAnswer={onAnswer}
            />
          );
        })}
      </div>
      <div>{show && <Answer exist={exist} onCancel={onCancel} />}</div>
    </div>
  );
}

export default memo(CommentsContainer);

CommentsContainer.propTypes = {
  count: PropTypes.number,
  comments: PropTypes.array,
  exist: PropTypes.bool,
  // t: PropTypes.func
};

CommentsContainer.defaultProps = {
  count: 0,
  comments: [],
  exist: false,
  // t: (text) => text
};
