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
  console.log(comments);

  // Костыли !!! :)
  const addForm = (comments, formId) => {
    const commentWithForm = comments.findIndex((item) => item._id == formId);

    if (commentWithForm + 1 === comments.length)
      return { _id: comments[commentWithForm]._id, offset: "40px" };

    for (let i = commentWithForm + 1; i < comments.length; i++) {
      console.log(commentWithForm);

      if (comments[i].offset <= comments[commentWithForm].offset) {
        console.log(`found you ${comments[i - 1]._id}`);
        if (comments[i - 1]._id === formId) {
          return { _id: formId, offset: "40px" };
        } else {
          return { _id: comments[i - 1]._id, offset: "0px" };
        }
      }
    }
  };

  const commentWithForm = formId !== "" ? addForm(comments, formId) : null;

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
          {/* {formId === item._id && ( */}
          {item._id === commentWithForm?._id && (
            <div style={{ paddingLeft: commentWithForm.offset }}>
              <CommentForm
                formId={formId}
                sessionExists={sessionExists}
                type="comment"
                pathname={pathname}
                onCloseForm={onCloseForm}
                onCommentSend={onCommentSend}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default memo(CommentsList);
