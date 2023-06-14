import { memo } from "react";
import PropTypes from "prop-types";
import CommentLayout from "../comment-layout";

function CommentsListRender({inputRef, level, t, articleId, showReplyBox, comments, onNewComment, onCancelComment, onSendComment, isAuth, currentCommentId, currentUserId}) {
  return (
    
    <div className="CommentsList">
         {comments?.length &&
          comments.map((comment) => (
             <CommentLayout
              key={comment._id}
              showReplyBox={showReplyBox}
              comment={comment}
              comments={comments}
              onNewComment={onNewComment}
              onCancelComment={onCancelComment}
              onSendComment={onSendComment}
              currentCommentId={currentCommentId}
              isAuth={isAuth}
              articleId={articleId}
              currentUserId={currentUserId}
              t={t}
              level={level+1}
              inputRef={inputRef}
            />
            
          ))}
    </div>
  );
}

CommentsListRender.propTypes = {
  articleId: PropTypes.string,
  comment: PropTypes.object,
  showReplyBox: PropTypes.bool,
  onSendComment: PropTypes.func,
  onCancelComment: PropTypes.func,
  onNewComment: PropTypes.func,
  t: PropTypes.func,
  isAuth: PropTypes.bool,
  level: PropTypes.number,
};

CommentsListRender.defaultProps = {
  onSendComment: () => {},
  onCancelComment: () => {},
  onNewComment: () => {},
  t: () => {},
};

export default memo(CommentsListRender);
