import { memo, useState } from "react";
import './style.css';
import PropTypes from "prop-types";
import { convertDate } from "../../utils/convert-date";
import useTranslate from "../../hooks/use-translate";

function Comment({ comment, currentComment, setCurrentComment, addComment, exists, userId, onSignIn }) {
    const [commentText, setCommentText] = useState('');
    const { t } = useTranslate();

    function submitComment(e, id) {
        e.preventDefault();
        addComment(commentText, { _id: id, _type: 'comment' });
        setCurrentComment('');
    }


    return (
        <div className='Comment'>
            <div className='Comment-container'>
                <h4 className={userId !== comment.author._id ? 'Comment-author' : 'Comment-author-active'}>{comment.author.profile.name}</h4>
                <p className='Comment-date'>{convertDate(comment.dateCreate)}</p>
            </div>
            <p className="Comment-text">{comment.text}</p>
            <button className='Comment-button-reply' onClick={() => setCurrentComment(comment._id)}>{t('comments.reply')}</button>
            <div className={comment.level < 5 ? 'Comment-reply' : ''}>
                {comment.children.length > 0 && comment.children.map((childComment) => (
                    <Comment comment={childComment} key={childComment._id} currentComment={currentComment} setCurrentComment={setCurrentComment} addComment={addComment} userId={userId} exists={exists} onSignIn={onSignIn} />
                ))}

                {exists && currentComment === comment._id &&
                    <form className={comment.level < 5 ? 'Comment-form' : ''}>
                        <h5 className='Comments-subtitle'>{t('comments.newReply')}</h5>
                        <textarea className='Comments-input' type='text' required onChange={(e) => setCommentText(e.target.value)} />
                        <div className='Comment-buttons-container'>
                            <button className="Comments-button" disabled={!commentText.trim()} onClick={(e) => submitComment(e, comment._id)}>{t('comments.submit')}</button>
                            <button className="Comments-button" onClick={() => setCurrentComment('')}>{t('comments.cancel')}</button>
                        </div>
                    </form>
                }
                <>
                    {!exists && currentComment === comment._id &&
                        <>
                            <p className='Comment-login'>
                                <span onClick={onSignIn}>{t('comments.signIn')}</span>
                                , {t('comments.conditionReply')}
                                <button className='Comment-login-cancel' onClick={() => setCurrentComment('')}>{t('comments.cancel')}</button>
                            </p>
                        </>

                    }
                </>
            </div>
        </div>
    );
}


Comment.propTypes = {
    comment: PropTypes.object,
    addComment: PropTypes.func,
    exists: PropTypes.bool,
    userId: PropTypes.string,
    onSignIn: PropTypes.func,
    currentComment: PropTypes.string,
    setCurrentComment: PropTypes.func,
}

Comment.defaultProps = {
    addComment: () => { },
    onSignIn: () => { },
    setCurrentComment: () => { },
}


export default memo(Comment);