import { memo, useCallback, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useSelector from '../../hooks/use-selector';
import dateFormat from '../../utils/date-format';
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
    errorMessage,
    setErrorMessage,
    handleLogin,
  } = props;

  const select = useSelector(state => ({
    user: state.session.user,
  }));

  const formRef = useRef(null);
  const [currentFormRefId, setCurrentFormRefId] = useState(null);

  const callbacks = {
    handleReplyClick: useCallback(() => {
      if (!isAuthenticated) {
        setAuthMessageCommentId(comment._id);
      } else {
        if (replyToCommentId === comment._id) {
          setReplyToCommentId(null);
          setIsReplyActive(false);
          setCurrentFormRefId(null);
          setErrorMessage('');
        } else {
          setReplyToCommentId(comment._id);
          setIsReplyActive(true);
          setCurrentFormRefId(comment._id);
          setErrorMessage('');
        }
      };
    }, [isAuthenticated, replyToCommentId])
  };

  useEffect(() => {
    if (isReplyActive && formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [replyToCommentId, currentFormRefId, isReplyActive]);
  
  const hasChildren = comment.children && comment.children.length > 0;

  const cn = bem('CommentCard');
  
  return (
    <div className={cn()}>
        <div className={cn('info')}>
            <div className={select?.user._id === comment.author._id ? 'CommentCard-username__auth' : cn('username')}>
                {comment.author.profile?.name ? comment.author.profile?.name : select.user.profile?.name}
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
            <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={handleLogin}>Войдите</span>, чтобы иметь возможность комментировать
          </div>
        )}

      {isAuthenticated && 
      (replyToCommentId === comment._id) && 
      isReplyActive && (depth === maxDepth || !hasChildren) && (
        <div ref={formRef}>
          <CommentForm
            commentTitle="Новый ответ"
            type="reply"
            setIsReplyActive={setIsReplyActive}
            setReplyToCommentId={setReplyToCommentId}
            onChange={onChange}
            onSubmit={handleAddComment}
            errorMessage={errorMessage}
          />
        </div>
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
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              handleLogin={handleLogin}
            />
          ))}
        </div>
          {isAuthenticated && (replyToCommentId === comment._id) && isReplyActive && (
            <div ref={formRef}>
              <CommentForm
                className={cn('child')}
                commentTitle="Новый ответ"
                type="reply"
                setIsReplyActive={setIsReplyActive}
                setReplyToCommentId={setReplyToCommentId}
                onChange={onChange}
                // onSubmit={handleAddComment}
                onSubmit={(newComment) => {
                  handleAddComment(newComment);
                  // setIsReplyActive(false);
                  // setReplyToCommentId(null);
                }}
                errorMessage={errorMessage}
              />
            </div>
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
  handleLogin: PropTypes.func,
};

export default memo(CommentCard);
