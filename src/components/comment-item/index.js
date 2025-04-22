import { memo } from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/format-date';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentItem({ comment = {}, onReplyClick = () => { }, user = {}, isAuthorized = false }) {
    const cn = bem('CommentItem');
    return (
        <div className={cn()}>
            <div className={cn('header')}>
                <span className={cn('author')}
                    style={isAuthorized && comment.author?._id === user._id ? { color: '#4B5563' } : undefined}>
                    {comment.author?.profile?.name || user?.profile?.name}</span>
                <span className={cn('date')}>{formatDate(comment.dateCreate)}</span>
            </div>
            <div className={cn('text')}>{comment.text}</div>
            <button className={cn('reply')} onClick={() => onReplyClick(comment._id)}>Ответить</button>
        </div>
    );
}

CommentItem.propTypes = {
    comment: PropTypes.shape({
        _id: PropTypes.string,
        text: PropTypes.string,
        author: PropTypes.shape({
            profile: PropTypes.shape({
                name: PropTypes.string,
            }),
        }),
        date: PropTypes.string,
    }),
    onReplyClick: PropTypes.func,
    user: PropTypes.shape({
        profile: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
    isAuthorized: PropTypes.bool,
};

export default memo(CommentItem);
