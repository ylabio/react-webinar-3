import PropTypes from 'prop-types';
import { memo } from "react"
import './style.css'
import dateFormat from '../../utils/dateFormat';
import { getLatestCommentNode } from '../../utils/getLatestCommentNode';


const ArticleComment = (props) => {
  const isCurrentUserComment = props.comment.author._id === props.loggedUserId
  const callbacks = {
    openReplyForm: () => props.handleCommentForm(prev => prev = {
      form: 'reply', 
      replyFormBelowCommentId: getLatestCommentNode(props.comment),
      parent: {
        replyCommentId: props.comment._id,
        replyLevel: props.comment.level + 1
      }
    })
  }
  
  return (
    <div className="ArticleComment" style={ 
      (props.comment.level >= 10) ? {paddingLeft: 10 * 30 + 'px'} : 
      (props.comment.level > 0) ? {paddingLeft: props.comment.level * 30 + 'px'} : {}}>
      <div className="ArticleComment-head">
        <p className={isCurrentUserComment
        ? 'ArticleComment-username ArticleComment-username--current-user'
        : 'ArticleComment-username'
        }>
          {props.comment.author.profile.name}
        </p>
        <p className="ArticleComment-date">{dateFormat(props.comment.dateCreate)}</p> 
      </div>

      <p className="ArticleComment-content">{props.comment.text}</p>

      <button 
        onClick={callbacks.openReplyForm} 
        className="ArticleComment-reply-btn"
      >
        {props.t('article.commentaries-reply')}
      </button>
    </div>
  )
}

ArticleComment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string
      }),
      _id: PropTypes.string,
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string
  }),
  loggedUserId: PropTypes.string,
  handleCommentForm: PropTypes.func,
  t: PropTypes.func
}

ArticleComment.defaultProps = {
  t: (text) => text
}

export default memo(ArticleComment)