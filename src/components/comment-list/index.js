import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import commentItem from '../comment-item';
import { useState } from 'react';
import CommentItem from '../comment-item';
import CommentForm from '../comment-form';
import IsLogin from '../../utils/comment-or-login';
const CommentsList = ({ comments, level = 0, activeForm, replyToCommentId, onReply, onReplySubmit, onCancel, name, baseIndent, title, placeholder, sendButton, cancelButton, answer, maxLevel = 5 }) => {
    
    return comments.map(comment => {
        const placeholderText = comment.author?.profile?.name
            ? `Мой ответ для ${comment.author.profile.name}`
            : `Мой ответ для ${name}`;
        return (
            <div key={comment._id}>
            
            <CommentItem
                author={comment.author?.profile?.name || name}
                date={comment.dateCreate}
                text={comment.text}
                level={Math.min(level, maxLevel)}
                onReply={() => onReply(comment._id)}
                baseIndent={baseIndent}
                answer={answer}
                name={name}
            />
            
            
            {comment.replies && comment.replies.length > 0 && (
                <CommentsList
                    comments={comment.replies}
                    level={level + 1}
                    activeForm={activeForm}
                    replyToCommentId={replyToCommentId}
                    onReply={onReply}
                    onReplySubmit={onReplySubmit}
                    onCancel={onCancel}
                    name={name}
                    baseIndent={baseIndent}
                    title={title}
                    placeholder={placeholder}
                    sendButton={sendButton}
                    cancelButton={cancelButton}
                        answer={answer}
                />
            )}
                {activeForm === `replyTo-${comment._id}` && (
                    <IsLogin
                        level={level}
                        baseIndent={baseIndent}
                        onCancel={onCancel}
                        Component={CommentForm}
                        componentProps={{
                            key: `reply-to-${comment._id}`,
                            onSubmit: (text) => onReplySubmit(text, comment._id),
                            onCancel: onCancel,
                            title: title,
                            placeholder: placeholderText,
                            sendButton: sendButton,
                            cancelButton: cancelButton
                        }}
                    />
                )}
            </div>
        );
    });
};

export default memo(CommentsList);
