import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { useState } from 'react';
function CommentForm({ onSubmit, onCancel}) {
    const [commentText, setCommentText] = useState('');
    const cn = bem('CommentForm');
  
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(commentText);
        setCommentText('');
    };

    const handleCancel = () => {
        setCommentText('');
        if (onCancel) {
            onCancel();
        }
    };
    return (
        <form style={{ paddingLeft: `${paddingLeft}px` }} className={cn()} onSubmit={handleSubmit}>
            <textarea
                className={cn('input')}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment here..."
                required
            />
            <button className={cn('button')} type="submit">Submit Comment</button>
            {onCancel && <button className={cn('button', 'cancel')} type="button" onClick={handleCancel}>Cancel</button>}
             
        </form>
    );
}

CommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
};

export default memo(CommentForm);
