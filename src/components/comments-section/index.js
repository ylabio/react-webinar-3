import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';

function CommentItem({comment, replyTo, text, onTextChange, onReplyClick, onSubmit, isAuthorized}) {
  const isChild = (comment.level || 0) > 0;

  return (
    <div className="comment" style={{ paddingLeft: (comment.level || 0) * 40 }}>
      <div className="comment-header">
        <span className={`comment-author${isChild ? ' child' : ''}`}>{comment.author}</span>
        <span className="comment-date">{new Date(comment.date).toLocaleString()}</span>
      </div>
      <div className="comment-body">{comment.text}</div>
      {isAuthorized && (
        <button className="comment-reply-btn" onClick={() => onReplyClick(comment.id)}>
          Ответить
        </button>
      )}
      {comment.replies.length > 0 && (
        <div className="comment-children">
          {comment.replies.map(child => (
            <CommentItem
              key={child.id}
              comment={{ ...child, level: (comment.level || 0) + 1 }}
              replyTo={replyTo}
              text={text}
              onTextChange={onTextChange}
              onReplyClick={onReplyClick}
              onSubmit={onSubmit}
              isAuthorized={isAuthorized}
            />
          ))}
        </div>
      )}
      {isAuthorized && replyTo === comment.id && (
        <form className="comment-reply-form" onSubmit={onSubmit}>
          <h3 className='new-reply-heading'>Новый ответ</h3>
          <textarea
            className="comment-textarea"
            value={text}
            onChange={e => onTextChange(e.target.value)}
            placeholder="Ваш ответ..."
            required
          />
          <div className='controls-layout'>
            <Button
             title={'Отправить'}
             style={'primary'}
             type="submit"
             className="comment-submit-btn"
             onClick={() => {window.location.reload()}}
            />

            <Button
              title={'Отмена'}
              style={'outline'} 
              type="button"
              onClick={() => {
                onReplyClick(null);
                onTextChange('');
                
              }}
              className="comment-submit-btn"
            />
          </div>

        </form>
      )}
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  replyTo: PropTypes.string,
  text: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onReplyClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired
};

export default function CommentsSection({comments, replyTo, text, onTextChange, onReplyClick, onSubmit, isAuthorized}) {
  return (
    <div className="comments-section">
      {comments.map(c => (
        <CommentItem
          key={c.id}
          comment={{ ...c, level: 0 }}
          replyTo={replyTo}
          text={text}
          onTextChange={onTextChange}
          onReplyClick={onReplyClick}
          onSubmit={onSubmit}
          isAuthorized={isAuthorized}
        />
      ))}
      {!replyTo && (
        isAuthorized ? (
          <form className="new-comment-form" onSubmit={onSubmit}>
            <h3 className='new-comment-heading'>Новый комментарий</h3>
            <textarea
              className="comment-textarea"
              value={text}
              onChange={e => onTextChange(e.target.value)}
              required
            />
            <button className="comment-submit-btn" onClick={() => {window.location.reload()}} type="submit">Отправить</button>
          </form>
        ) : (
          <p className="comments-login-prompt">
            <Link className='link-to' to="/login">Войдите</Link>, чтобы иметь возможность комментировать
          </p>
        )
      )}
    </div>
  );
}

CommentsSection.propTypes = {
  comments: PropTypes.array.isRequired,
  replyTo: PropTypes.string,
  text: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onReplyClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired
};
