import {cn as bem} from '@bem-react/classname';
import {memo} from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/date-format';
import AddComment from '../add-comment';
import './style.css';

const Comment = ({
  commentData,
  commentToReplyId,
  handleOpenReply,
  unselectComment,
  replyToComment,
  isLoggedIn,
  noAuthNavigate,
}) => {
  const cn = bem('Comment');

  const callbacks = {
    onAnswerClick: () => handleOpenReply(commentData._id),
    onReply: (text) => replyToComment(text, commentData._id)
  }

  const commentHasChildren = commentData.children?.length

  return (
    <div className={cn()}>
      <div className={cn('heading')}>
        <p className={cn('user')}>{commentData.author.profile.name}</p>
        <p className={cn('date')}>{formatDate(commentData.dateCreate)}</p>
      </div>
      <div className={cn('content')}>
        <p className={cn('text')}>{commentData.text}</p>
      </div>
      <button onClick={callbacks.onAnswerClick} className={cn('btn')}>Ответить</button>
      {commentHasChildren ? (
        <div className={cn('children')}>
          {commentData.children.map(child => (
            <Comment
              key={child._id}
              commentData={child}
              {...{
                commentToReplyId,
                handleOpenReply,
                unselectComment,
                replyToComment,
                isLoggedIn,
              }}
            />
          ))}

        </div>
      ): ''}
      {commentToReplyId === commentData._id &&
        <AddComment
          isLoggedIn={isLoggedIn}
          submitAction={callbacks.onReply}
          onCancelReply={unselectComment}
          noAuthNavigate={noAuthNavigate}
          label='Новый ответ'
          commentHasChildren={commentHasChildren}
        />
      }
    </div>
  );
};

Comment.propTypes = {
  commentData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    dateCreate: PropTypes.string.isRequired,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      _id: PropTypes.string.isRequired
    }).isRequired,
    parent: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      _type: PropTypes.string.isRequired
    }).isRequired,
    isDeleted: PropTypes.bool.isRequired,
    children: PropTypes.array.isRequired
  }).isRequired,
  commentToReplyId: PropTypes.string,
  handleOpenReply: PropTypes.func.isRequired,
  unselectComment: PropTypes.func.isRequired,
  replyToComment: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  noAuthNavigate: PropTypes.func,
};

export default memo(Comment)