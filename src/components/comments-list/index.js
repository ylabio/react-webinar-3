import { memo, useEffect, useState, useCallback } from "react";
import CommentsForm from "../comments-form";
import Button from "../button";
import dataFormate from "../../utils/date-format";
import { useCommentReplies } from "../../hooks/use-comment-replies";
import CommentItem from "../comment-item";
import { Link, useNavigate } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsList({ 
  t = text => text, 
  value, 
  count, 
  user, 
  list = [], 
  onChange = () => {}, 
  onClick,
  onClickAnswer 
}) {
  const cn = bem('CommentsList');
  const navigate = useNavigate();
  const { replyTo, replyIndex, handleReplyClick, resetReply } = useCommentReplies();

  const handleReply = (item, index) => {
    if (!user?._id) {
      navigate('/login');
    } else {
      handleReplyClick(item, index, list);
      onChange('');
    }
  };

  const handleSubmitReply = () => {
    if (!value.trim()) return;
    
    onClickAnswer(replyTo);
    resetReply();
    onChange('');
  };

  const handleCancelReply = () => {
    resetReply();
    onChange('');
  };

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <div className={cn('title')}>{`${t('article.comments')} (${count})`}</div>
        
        {list.map((item, index) => (
          <CommentItem
            key={`comment-${item._id}`}
            comment={item}
            onReply={() => handleReply(item, index)}
            showReplyForm={index === replyIndex - 1}
            onFormChange={onChange}
            onFormSubmit={handleSubmitReply}
            onFormCancel={handleCancelReply}
            formValue={value}
            t={t}
          />
        ))}
        
        {!user?._id ? (
          <div className={cn('link')}>
            <Link to="/login">{t('article.login.part1')}</Link>
            {t('article.login.part2')}
          </div>
        ) : !replyTo && (
          <CommentsForm
            title={t('article.new-comment')}
            titleButtonSend={t('article.send')}
            onChange={onChange}
            onClick={onClick}
            value={value}
          />
        )}
      </div>
    </div>
  );
}

export default memo(CommentsList);
