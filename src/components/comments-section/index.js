import { Link } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';

function CommentItem({comment, replyTo, text, onTextChange, onReplyClick, onSubmit, isAuthorized}) {
  
  const isChild = (comment.level || 0) > 0;
  const level = comment.level ?? 0;
  const base_padding = 40;
  const max_level = 4;
  const extra_padding = -30;

  const indentPx =
    level <= max_level
      ? level * base_padding
      : max_level * base_padding + (level - max_level) * extra_padding;

  const navigate = useNavigate();


  const handleReply = () => {
    if (isAuthorized) {
      onReplyClick(comment.id);
    } else {
      navigate('/login', { state: { back: window.location.pathname } });
    }
  };

  const replyRef = useRef(null);

  useEffect(() => {
    if (replyTo === comment.id && replyRef.current) {
      replyRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [replyTo, comment.id]);

  return (
    <div className="comment" style={{ paddingLeft: indentPx }}>
      <div className="comment-header">
        <span className={`comment-author${isChild ? ' child' : ''}`}>
          {comment.author}
        </span>
        <span className="comment-date">
          {new Date(comment.date).toLocaleString()}
        </span>
      </div>
      <div className="comment-body">{comment.text}</div>

      <button
        className="comment-reply-btn"
        onClick={handleReply}
      >
        Ответить
      </button>

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

      {/* Форма ответа */}
      {isAuthorized && replyTo === comment.id && (
        <form ref={replyRef} className="comment-reply-form" onSubmit={onSubmit} style={{ paddingLeft: indentPx }}>
          <h3 className="new-reply-heading">Новый ответ</h3>
          <textarea
            className="comment-textarea"
            value={text}
            onChange={e => onTextChange(e.target.value)}
            placeholder="Ваш ответ..."
            required
          />
          <div className="controls-layout">
            <Button
              title="Отправить"
              style="primary"
              type="submit"
              disabled={!text.trim()}
              onClick={() => {window.location.reload()}}
            />
            <Button
              title="Отмена"
              style="outline"
              type="button"
              onClick={() => onReplyClick(null)}
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
            <button className="comment-submit-btn" disabled={!text.trim()} onClick={() => {window.location.reload()}} type="submit">Отправить</button>
          </form>
        ) : (
          <p className="comments-login-prompt" >
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
