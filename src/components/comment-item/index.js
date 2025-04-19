import { memo } from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/format-date';
import CommentForm from '../comment-form';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';


function CommentItem({ comment = {}, onReplyClick = () => { }, replyingId = () => { }, user = {}, isAuthorized = false }) {
    const isReplying = replyingId === comment._id;

    const cn = bem('CommentItem');
    return (
        <div className={cn()}>
            <div className={cn('header')}>
                <span className={cn('author')}>{comment.author?.profile?.name || user?.profile?.name}</span>
                <span className={cn('date')}>{formatDate(comment.dateCreate)}</span>
            </div>
            <div className={cn('text')}>{comment.text}</div>
            <button className={cn('reply')} onClick={() => onReplyClick(comment._id)}>Ответить</button>

            {isReplying ?
                isAuthorized ? <CommentForm parentId={comment._id} parentName={comment.author?.profile?.name || user?.profile?.name} onCancel={() => onReplyClick(null)} />
                    : <p className={cn('enter')}><Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать</p>
                : null}

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
    replyingId: PropTypes.string,
    user: PropTypes.shape({
        profile: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
    isAuthorized: PropTypes.bool,
};

export default memo(CommentItem);
