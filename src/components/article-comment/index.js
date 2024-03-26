import PropTypes from 'prop-types';
import { memo } from "react"
import './style.css'
import dateFormat from '../../utils/dateFormat';
import ArticleCommentReplyForm from '../article-comment-reply-form';


const ArticleComment = (props) => {
  const isCurrentUserComment = props.comment.author._id === props.loggedUserId

  const callbacks = {
    openReplyForm: () => props.handleCommentForm(prev => prev = {
      form: 'reply', 
      commentIndex: props.index
    })
  }
  
  return (
    <div className="ArticleComment" style={ 
      (props.comment.level >= 10) ? {marginLeft: 10 * 30 + 'px'} : 
      (props.comment.level > 0) ? {marginLeft: props.comment.level * 30 + 'px'} : {}}>
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

      {props.replyFormOpen && (
        <ArticleCommentReplyForm 
         commentParentId={props.comment._id}
         pathname={props.pathname}
         isLoggedIn={props.isLoggedIn}
         link={props.link}
         handleCommentForm={props.handleCommentForm} 
         onAddComment={props.onAddComment}
         t={props.t}
        />
      )}
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
  index: PropTypes.number,
  replyFormOpen: PropTypes.bool,
  handleCommentForm: PropTypes.func,
  t: PropTypes.func
}

ArticleComment.defaultProps = {
  t: (text) => text
}

export default memo(ArticleComment)