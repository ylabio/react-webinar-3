import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Comment from './../comment';
import CommentForm from './../comment-form';
import './style.css';

function CommentList(props) {

 const { 
    comments, 
    count,
    userId,
    session,
    onOpenReply,
    onCloseReply,
    onCreateNewComment,
    onAddReplyComment,
    showCommentForm
  } = props; 

  const cn = bem('CommentList');
  
  return (
    <div className={cn()}>
    <h2 className={cn('title')}> Комментарии ({count})</h2>
        {comments.map((item) => (
        <div key={item._id}>
            <Comment
             comment={item}
             session={session}   
             currentUserId={userId} 
             onOpenReply={onOpenReply}
             onCloseReply={onCloseReply}
             onAddReplyComment={onAddReplyComment}
            />
        </div>
        ))}   
        
      {showCommentForm && (
        <CommentForm session={session} onCreateNewComment={(text) => onCreateNewComment(text)} />
      )}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array,
  count: PropTypes.number,
  userId: PropTypes.string,
  session: PropTypes.bool,
  onOpenReply: PropTypes.func,
  onCloseReply: PropTypes.func,
  onCreateNewComment: PropTypes.func,
  onAddReplyComment: PropTypes.func,
  showCommentForm: PropTypes.bool
};

export default memo(CommentList);
