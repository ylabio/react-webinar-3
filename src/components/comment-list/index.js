import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import commentItem from '../comment-item';
import { useState } from 'react';
import CommentItem from '../comment-item';
import CommentForm from '../comment-form';
const CommentsList = ({ comments, level = 0, activeForm, replyToCommentId, onReply, onReplySubmit, onCancel, name, baseIndent }) => {
    return comments.map(comment => (
        <div key={comment._id} >
            <CommentItem
                author={comment.author && Object.keys(comment.author).length > 0 && comment.author.profile
                    ? comment.author.profile.name
                    : name}
                date={comment.dateCreate}
                text={comment.text}
                level={level}
                onReply={() => onReply(comment._id)}
                baseIndent={baseIndent}
            />
            {activeForm === `replyTo-${comment._id}` && (
                <CommentForm
                    key={`reply-to-${comment._id}`}
                    onSubmit={(text) => onReplySubmit(text, comment._id)}
                    onCancel={onCancel}
                />
            )}
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
                />
            )}
        </div>
    ));
};

export default memo(CommentsList);
