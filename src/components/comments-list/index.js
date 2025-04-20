import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import Comment from '../comment';
import CommentForm from '../comment-form';
import './style.css';
import useSelector from '../../hooks/use-selector';


function CommentsList({ items = [], count = '0', articleId, onAddComment, t = (text) => text }) {
  const cn = bem('CommentsList');
  const [replyTo, setReplyTo] = useState(null);
  const [showMainForm, setShowMainForm] = useState(true);
  const [error, setError] = useState(null);
  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  const handleSubmitReply = async (text, parentId, parentType) => {
    try {
      setError(null);
      await onAddComment(text, parentId, parentType);
      setReplyTo(null);
    } catch (e) {
      setError(t('comment.error'));
      console.error(e);
    }
  };

  const handleSubmitNewComment = async (text) => {
    try {
      setError(null);
      await onAddComment(text, articleId, 'article');
      setShowMainForm(false);
    } catch (e) {
      setError(t('comment.error'));
      console.error(e);
    }
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  const handleReplyClick = (commentId) => {
    if (!select.exists) {
      setReplyTo(commentId);
      setShowMainForm(false);
      return;
    }
    if (replyTo === commentId) {
      setReplyTo(null);
    } else {
      setReplyTo(commentId);
      setShowMainForm(false);
    }
  };

  const toggleMainForm = () => {
    setShowMainForm(!showMainForm);
    setReplyTo(null);
  };

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{t('comment.title')} ({count})</h3>
      {error && <div className={cn('error')}>{error}</div>}
      <div className={cn('container')}>
        {items.map(item => (
          <Comment 
            key={item._id} 
            comment={item} 
            onReply={handleReplyClick}
            replyTo={replyTo}
            onCancelReply={handleCancelReply}
            onSubmitReply={handleSubmitReply}
            t={t}
            isAuthenticated={select.exists}
          />
        ))}
      </div>
      <div className={cn('new-comment')}>
        {select.exists ? (
          <>
            {!showMainForm && (
              <button 
                className={cn('add-comment-btn')} 
                onClick={toggleMainForm}
              >
                {t('comment.addComment')}
              </button>
            )}
            {showMainForm && (
              <CommentForm 
                onSubmit={handleSubmitNewComment} 
                t={t}
                placeholder={t('comment.placeholder')}
                onCancel={() => setShowMainForm(false)}
              />
            )}
          </>
        ) : (
          <div className={cn('auth-message')}>
            <Link to="/login" state={{ back: window.location.pathname }}>
              {t('comment.signIn')}
            </Link> {t('comment.toComment')}
          </div>
        )}
      </div>
    </div>
  );
}

CommentsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      dateCreate: PropTypes.string.isRequired,
      author: PropTypes.shape({
        profile: PropTypes.shape({
          name: PropTypes.string
        })
      }),
      children: PropTypes.array,
      parent: PropTypes.shape({
        _id: PropTypes.string
      })
    })
  ),
  articleId: PropTypes.string.isRequired,
  onAddComment: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default memo(CommentsList);