import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { useState } from 'react';
function CommentForm({ onSubmit, onCancel, style,title,placeholder='',sendButton,cancelButton }) {
    const [commentText, setCommentText] = useState('');
    const cn = bem('CommentForm');
  
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(commentText);
        setCommentText('');
    };

    const handleCancel = () => {
        setCommentText('');
        onCancel && onCancel();
    };
    return (
        <form style={style} className={cn()} onSubmit={handleSubmit}>
            <h2 className={cn('title')}>{title}</h2> 
            <textarea
                className={cn('input')}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={placeholder}
                required
            />
            <div className={cn('actions')}> 
                <button className={cn('button')} type="submit">{sendButton}</button>
                {onCancel && (
                <button className={cn('button', 'cancel')} type="button" onClick={handleCancel}>{cancelButton}</button>
                 )}
            </div>
        </form>
    );
}

CommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    sendButton: PropTypes.string,
    cancelButton: PropTypes.string,
};

export default memo(CommentForm);
