import { memo } from "react";
import PropTypes from "prop-types";
import CommentCreate from "../comment-create";
import formatDate from "../../utils/format-date";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import CommentsListRender from "../../components/comment-list";

function CommentLayout({
  comment,
  showReplyBox,
  onSendComment,
  onCancelComment,
  onNewComment,
  isAuth,
  currentCommentId,
  articleId,
  currentUserId,
  t,
  level,
  inputRef
}) {
  const cn = bem("Comment");
  const authorIsMe = currentUserId === comment.author._id;
  const authorNameClass = authorIsMe ? "authorName authorIsMe" : "authorName";
  const margin = level > 30 ? 0 : level * 10;
  return (
    <div>
      <div style={{ marginLeft: `${margin}px` }} className="Comment">
        <div className={cn("info")}>
          <p className={authorNameClass}>{comment.author.profile.name}</p>
          <p className={cn("createdAt")}>{formatDate(comment.dateCreate)}</p>
        </div>
        <p className={cn("text")}>{comment.text}</p>
        <button
          className={cn("reply")}
          onClick={(e) => onNewComment(comment._id)}
        >
          {t("answer")}
        </button>
      </div>
      {!!comment.children.length && (
        <div>
          <CommentsListRender
            showReplyBox={showReplyBox}
            comments={comment.children}
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
        </div>
        
      )}
   <CommentCreate
        type="reply"
        showReplyBox={showReplyBox}
        onSendComment={onSendComment}
        onCancelComment={onCancelComment}
        text={t("new answer")}
        isAuth={isAuth}
        currentCommentId={currentCommentId}
        commentId={comment._id}
        articleId={articleId}
        t={t}
        margin={margin}
        inputRef={inputRef}
      /> 
    </div>
  );
}

CommentLayout.propTypes = {
  articleId: PropTypes.string,
  comment: PropTypes.object,
  showReplyBox: PropTypes.bool,
  onSendComment: PropTypes.func,
  onCancelComment: PropTypes.func,
  onNewComment: PropTypes.func,
  isAuth: PropTypes.bool,
};

CommentLayout.defaultProps = {
  onSendComment: () => {},
  onCancelComment: () => {},
  onNewComment: () => {},
};

export default memo(CommentLayout);
