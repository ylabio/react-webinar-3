import React, { useState, forwardRef } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Button from '../button';

const CommentForm = forwardRef(({ onSubmit, level = 0, t }, ref) => {
    const [commentText, setCommentText] = useState('');

    const marginLeft = level * 40;

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(commentText)
    }

    return (
        <form style={{ marginLeft: marginLeft }} className='Comment-form' ref={ref}>
            <h2 className='Comment-form-title'>{t('comments.formTitle')}</h2>
            <textarea value={commentText} onChange={e => setCommentText(e.target.value)} className='Comment-form-field' />
            <Button style='primary' title={t('comments.formSend')} type='submit' onClick={e => handleSubmit(e)} />
        </form>
    )
})

CommentForm.propTypes = {
    onSubmit: PropTypes.func,
    level: PropTypes.number,
    t: PropTypes.func,
}

export default React.memo(CommentForm);