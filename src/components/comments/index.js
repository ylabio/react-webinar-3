import { memo, useState } from "react";
import './style.css';
import Comment from "../comment";
import PropTypes from 'prop-types';
import useTranslate from "../../hooks/use-translate";

function Comments({ comments, commentsCount, addComment, articleId, exists, userId, onSignIn }) {
    const [text, setText] = useState('')
    const [currentComment, setCurrentComment] = useState('')
    const { t } = useTranslate();
    function submitComment(e, parent) {
        e.preventDefault();
        addComment(text, parent);
        setText('');
    }

    return (
        <div className='Comments'>
            <h3 className='Comments-title'>{t('comments.title')} ({commentsCount})</h3>
            {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} currentComment={currentComment} setCurrentComment={setCurrentComment} addComment={addComment} exists={exists} userId={userId} onSignIn={onSignIn} />
            ))}
            {currentComment === '' &&
                <div className='Comments-container'>
                    {exists ?
                        <form>
                            <h5 className='Comments-subtitle'>{t('comments.newComment')}</h5>
                            <textarea type='text' className='Comments-input' required value={text} onChange={(e) => setText(e.target.value)} />
                            <button className='Comments-button' disabled={!text.trim()} onClick={(e) => submitComment(e, { _id: articleId, _type: 'article' })}>{t('comments.submit')}</button>
                        </form>
                        :
                        <p className='Comments-login'><span onClick={onSignIn}>{t('comments.signIn')}</span>, {t('comments.conditionComment')}</p>
                    }
                </div>}
        </div>
    );
}


Comments.propTypes = {
    comments: PropTypes.array,
    commentsCount: PropTypes.number,
    addComment: PropTypes.func,
    articleId: PropTypes.string,
    exists: PropTypes.bool,
    userId: PropTypes.string,
    onSignIn: PropTypes.func,
}

Comments.defaultProps = {
    addComment: () => { },
    onSignIn: () => { },
}


export default memo(Comments);