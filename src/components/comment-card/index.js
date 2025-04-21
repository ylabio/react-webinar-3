import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import dateFormat from '../../utils/date-format';
import { Link } from 'react-router-dom';
import CommentForm from '../comment-form';

function CommentCard(props) {
  const { 
    comment, 
    isAuthenticated, 
    handleAddComment = () => {}, 
    setAuthMessageCommentId = () => {}, authMessageCommentId, 
    replyToCommentId,
    depth,
    maxDepth,
    setReplyToCommentId = () => {}, 
    isReplyActive, 
    setIsReplyActive = () => {},
    onChange = () => {},
  } = props;

  const callbacks = {
    handleReplyClick: useCallback(() => {
      if (!isAuthenticated) {
        setAuthMessageCommentId(comment._id);
      } else {
        setReplyToCommentId(comment._id);
        setIsReplyActive(true);
      };
    }, [])
  };
  
  const hasChildren = comment.children && comment.children.length > 0;

  const cn = bem('CommentCard');

  return (
    <div className={cn()}>
        <div className={cn('info')}>
            <div className={cn('username')}>
                {comment.author.profile.name}
            </div>
            <div className={cn('date')}>
                {dateFormat(comment.dateCreate)}
            </div>
        </div>
        <div className={cn('comment')}>
          {/* {comment._id}<br /> */}
          {comment.text}
        </div>    
        <div className={cn('answer')} onClick={callbacks.handleReplyClick}>
            Ответить
        </div>

        {!isAuthenticated && (authMessageCommentId === comment._id) && (
          <div className={cn('authcaution')}>
            <Link to='/login' style={{ color: 'var(--primary)' }}>Войдите</Link>, чтобы иметь возможность комментировать
          </div>
        )}

      {isAuthenticated && 
      (replyToCommentId === comment._id) && 
      isReplyActive && (depth === maxDepth || !hasChildren) && (
        <CommentForm
          commentTitle="Новый ответ"
          type="reply"
          setIsReplyActive={setIsReplyActive}
          onSubmit={handleAddComment}
          onChange={onChange}
        />
      )}

      {hasChildren && (depth < maxDepth) && (
        <div className={cn('replies')}>
          <div key={comment._id}>
          {comment.children.map(child => (
            <CommentCard 
              key={child._id} 
              comment={child}
              handleAddComment={handleAddComment}
              isAuthenticated={isAuthenticated}
              setAuthMessageCommentId={setAuthMessageCommentId}
              authMessageCommentId={authMessageCommentId}
              replyToCommentId={replyToCommentId}
              setReplyToCommentId={setReplyToCommentId}
              isReplyActive={isReplyActive}
              setIsReplyActive={setIsReplyActive}
              onChange={onChange}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
            
          ))}
        </div>
          {isAuthenticated && (replyToCommentId === comment._id) && isReplyActive && (
            <CommentForm
              className={cn('child')}
              commentTitle="Новый ответ"
              type="reply"
              setIsReplyActive={setIsReplyActive}
              onSubmit={(newComment) => {
                handleAddComment(newComment);
                setIsReplyActive(false);
                setReplyToCommentId(null);
              }}
              onChange={onChange}
            />
          )}
        </div>
      )}
   </div>
  );
}     

CommentCard.propTypes = {
  comment: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
      dateCreate: PropTypes.string,
      author: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        profile: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
      children: PropTypes.array,
      parent: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        _type: PropTypes.string
      }),
    }).isRequired,
  isAutheticated: PropTypes.bool,
  handleAddComment: PropTypes.func,
  setAuthMessageCommentId: PropTypes.func,
  authMessageCommentId: PropTypes.string,
  replyToCommentId: PropTypes.string,
  depth: PropTypes.number,
  maxDepth: PropTypes.number,
  setReplyToCommentId: PropTypes.func,
  isReplyActive: PropTypes.bool,
  setIsReplyActive: PropTypes.func,
  onChange: PropTypes.func,
};

export default memo(CommentCard);
