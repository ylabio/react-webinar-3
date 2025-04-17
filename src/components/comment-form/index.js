import React, { useState } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Button from '../button';

function CommentForm({ onSubmit }) {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(commentText)
    }

    return (
        <form className='Comment-form'>
            <h2 className='Comment-form-title'>Новый комментарий</h2>
            <textarea value={commentText} onChange={e => setCommentText(e.target.value)} className='Comment-form-field' />
            <Button style='primary' title='Отправить' type='submit' onClick={e => handleSubmit(e)} />
        </form>
    )
}

CommentForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default React.memo(CommentForm);