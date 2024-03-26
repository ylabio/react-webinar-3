import { Fragment } from "react";
import dateFormat from "../../utils/format-date";
import CommentItem from "../../components/comment-item";
import useTranslate from "../../hooks/use-translate";
import CommentsLayout from "../../components/comments-layout";
import CommentsContainer from "../comments-container";
import PropTypes from "prop-types";


function RenderComments({comments, level, onSignIn, setId, activeItems, session, onResetId, onSendComment, setActiveCommentId }) {

  const {t} = useTranslate();

  return (
    <>
      {comments && comments.map(comment => {

        return (
          <Fragment  key={comment._id} >
            <CommentsLayout level={level}>
              <CommentItem  comment={comment} date={comment.dateCreate && dateFormat(comment.dateCreate, t('locale'))} setId={setId} setActiveCommentId={setActiveCommentId}/>

            </CommentsLayout>
            {comment.children && comment.children.length > 0 && (
              <CommentsLayout level={level}>
                <RenderComments comments={comment.children} onSignIn={onSignIn} setId={setId} session={session} onResetId={onResetId} activeItems={activeItems} onSendComment={onSendComment} setActiveCommentId={setActiveCommentId}/>
              </CommentsLayout>
            )}
            <CommentsLayout level={1}>
              {activeItems === comment._id && <CommentsContainer id={activeItems} session={session} onResetId={onResetId} onSignIn={onSignIn} onSendComment={onSendComment} type={"comment"}/>}
            </CommentsLayout>
          </Fragment>
        )
      })}
    </>
  )
}

RenderComments.propTypes = {
  comment: PropTypes.array,
  level: PropTypes.number,
  onSignIn: PropTypes.func,
  setId: PropTypes.func,
  activeItems: PropTypes.string,
  session: PropTypes.string,
  onResetId: PropTypes.func,
  onSendComment: PropTypes.func,
  setActiveCommentId: PropTypes.func,
};

export default RenderComments;