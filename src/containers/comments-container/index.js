import { memo } from "react";
import CommentLogin from "../../components/comment-login";
import CommentForm from "../../components/comment-form";
import PropTypes from "prop-types";

function CommentsContainer({session, id, onSendComment, onResetId, onSignIn, type}) {

  return (
    <>
      {!session ?
        <CommentLogin id={id} onResetId={onResetId}  onSignIn={onSignIn} /> :
        <CommentForm id={id} onSendComment={onSendComment} onResetId={onResetId} type={type}/>
      }
    </>
  )
}

CommentsContainer.propTypes = {
  session: PropTypes.string,
  id: PropTypes.string,
  onSendComment: PropTypes.func,
  onResetId: PropTypes.func,
  onSignIn: PropTypes.func,
  type: PropTypes.string,
};

export default memo(CommentsContainer);