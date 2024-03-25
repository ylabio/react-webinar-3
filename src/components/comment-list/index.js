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
    showCommentForm,
    lang,
    t
  } = props; 

  const cn = bem('CommentList');
  
  return (
    <div className={cn()}>
    <h2 className={cn('title')}> {t('commentList.comments')} ({count})</h2>
        {comments.map((item) => (
        <div key={item._id}>
            <Comment
             comment={item}
             session={session}   
             currentUserId={userId} 
             onOpenReply={onOpenReply}
             onCloseReply={onCloseReply}
             onAddReplyComment={onAddReplyComment}
             t={t}
             lang={lang}
            />
        </div>
        ))}   
        
      {showCommentForm && (
        <CommentForm session={session} onCreateNewComment={(text) => onCreateNewComment(text)} t={t} />
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
  showCommentForm: PropTypes.bool,
  t: PropTypes.func,
  lang: PropTypes.string
};

export default memo(CommentList);
