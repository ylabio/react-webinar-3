import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import Comment from '../comment';
import CommentNew from '../comment-new';
import './style.css';

const CommentList = (props) => {  

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
    t 
  } = props; 

  const cn = bem('CommentList');  
  
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('commentList.comments')} ({count})</h2>
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
          />
        </div>
      ))}        

      {showCommentForm && (
        <CommentNew session={session} onCreateNewComment={(text) => onCreateNewComment(text)} t={t} />
      )}
    </div>
  );
};

export default memo(CommentList);
