import {memo} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import Comment from "../../components/comment"
import useTranslate from "../../hooks/use-translate";
import CommentForm from "../comment-form";
import useSelector from "../../hooks/use-selector";

function CommentsList({articleId, comments, commentForm, onSend, onAnswer, onCancel}) {
  const {t, lang} = useTranslate();

  const cn = bem('CommentsList');

  const select = useSelector(state => ({
    username: state.session.user.username,
    userId: state.session.user._id,
  }));

  const commentsCount = comments.filter(comment => comment.type !== "form").length

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{t("commentaries.title")} ({commentsCount})</h1>
      <div className={cn('list')}>
        {comments.map(comment => {
          const isOwnComment = comment?.author?._id === select.userId;
          const username = comment?.author?.username || select.username
          
          if (comment.type === "form") {
            return <CommentForm key={comment.type}
                                id={comment.parent._id}
                                level={comment.level}
                                onSubmit={onSend}
                                isAnswer={commentForm.isAnswer}
                                onCancel={onCancel}/>
          }

          return <Comment
            t={t}
            lang={lang}
            key={comment._id}
            data={comment}
            username={username}
            isOwnComment={isOwnComment}
            onSend={onSend}
            onAnswer={onAnswer}
            onCancel={onCancel}
          />
        })}

        {!commentForm.isAnswer &&
          <CommentForm id={articleId} level={0} onSubmit={onSend} isAnswer={commentForm.isAnswer}/>}
      </div>
    </div>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
      dateCreate: PropTypes.string,
      author: PropTypes.shape({
        username: PropTypes.string,
        _id: PropTypes.string,
        _tree: PropTypes.object
      }),
      parent: PropTypes.shape({
        _id: PropTypes.string,
      })
    })
  })).isRequired,
  commentForm: PropTypes.shape({
    isAnswer: PropTypes.bool,
    answerId: PropTypes.string
  }),
  onSend: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  articleId: PropTypes.string,
};

export default memo(CommentsList);
