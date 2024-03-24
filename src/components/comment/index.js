import React, {memo} from 'react';
import PropTypes from 'prop-types';
import formatCommentDate from '../../utils/format-comment-date';
import CommentReply from '../comment-reply';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Comment = (props) => {  
  const {
    comment,
    session,
    currentUserId,
    onOpenReply,
    onCloseReply,
    onAddReplyComment,
    t,
    lang,
    level = 0 
  } = props;
  const cn = bem('Comment');
  const isCurrentUser = currentUserId && comment.author._id === currentUserId;   
  const maxNestingLevel = 10;
  const marginLeft = level <= maxNestingLevel ? `30px` : '0px'; 

  const nested = (comment.children || []).map((item) => {
    return (
      <div key={item._id} style={{ marginLeft }}>
        <Comment
          comment={item}          
          session={session}  
          currentUserId={currentUserId} 
          onOpenReply={onOpenReply}
          onCloseReply={onCloseReply}   
          onAddReplyComment={onAddReplyComment}    
          t={t}
          level={level + 1} 
        />
      </div>
    );
  }); 
  
  return (
    <div className={cn()}>
      <div className={cn('head-wrapper')}>
        <div className={cn('author', { 'currentUser': isCurrentUser })}>
          {comment.author.profile.name}
        </div>
        <div className={cn('date')}>{formatCommentDate(comment.dateCreate, lang)}</div>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      <button className={cn('button')} type='button' onClick={() => onOpenReply(comment._id)}>{t('comment.reply')}</button>     
      {comment.reply && 
        <CommentReply 
          session={session} 
          onCancel={() => onCloseReply(comment._id)} 
          onAddReplyComment={(text) => onAddReplyComment(comment._id, text)} 
          t={t} />
      }
      {nested}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  session: PropTypes.object,
  currentUserId: PropTypes.string,
  onOpenReply: PropTypes.func,
  onCloseReply: PropTypes.func,
  onAddReplyComment: PropTypes.func,
  t: PropTypes.func,
  lang: PropTypes.string,
  level: PropTypes.number,
};

export default memo(Comment);