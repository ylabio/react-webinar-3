import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import CommentForm from "../../components/comment-form";

function CommentsList({
  comments,
  renderItem,
  formId,
  sessionExists,
  pathname,
  onCloseForm,
  onCommentSend,
}) {
  const cn = bem("CommentsList");

  return (
    <div className={cn("")}>
      {comments.map((item) => (
        <div
          key={item._id}
          className={cn("item")}
          style={
            item.offset <= 14
              ? { paddingLeft: 40 * item.offset, paddingRight: 40 }
              : { paddingLeft: 40 * 14, paddingRight: 40 }
          }
        >
          {renderItem(item)}
          {formId === item._id && (
            <CommentForm
              formId={formId}
              sessionExists={sessionExists}
              type="comment"
              pathname={pathname}
              onCloseForm={onCloseForm}
              onCommentSend={onCommentSend}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(CommentsList);
