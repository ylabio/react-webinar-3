import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import formatDate from '../../utils/date-format';
function Comment({ author, date, text, onReply, level, baseIndent,answer,name }) {
    const cn = bem('Comment');
    const paddingLeft = baseIndent * level + 40;
    const formattedDate = formatDate(date);
    const isAuthorLoggedIn = author === name;

    return (
        <div className={`${cn()}`} style={{ paddingLeft: `${paddingLeft}px` }}>
            <div className={cn('header')}>
                <span className={cn(isAuthorLoggedIn ? 'author-logged' : 'author')}>{author}</span>
                <span className={cn('date')}>{formattedDate}</span>
            </div>
            <div className={cn('body')}>
                <p className={cn('text')}>{text}</p>
            </div>
            <div className={cn('footer')}>
                <button className={cn('reply-button')} onClick={onReply}>{answer}</button>
            </div>
        </div>
    );
}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onReply: PropTypes.func,
    level: PropTypes.number,
};

export default memo(Comment);
