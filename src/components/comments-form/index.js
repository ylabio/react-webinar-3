import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CommentsForm({addNewComment,isAuth,t,onSignIn}) {

  let [comment , setComment] = useState('')

  function addComment(){
    let regex = /^\s+$/g
    if (!regex.test(comment)){
      addNewComment(comment)
      setComment("")
    }
  }
  if(!isAuth) return <div className='CommentsForm-auth'><span className='CommentsForm-login' onClick={onSignIn}>{t('comment.login')}</span>, чтобы иметь возможность комментировать</div>
  return (
    <div className='CommentsForm' >
      <label className='CommentsForm-label' htmlFor="CommentsFormArea">{t('comment.newComment')}</label>
      <textarea className='CommentsForm-field' id="CommentsFormArea" value={comment} onChange={(e)=>setComment(e.currentTarget.value)}></textarea>
      <button onClick={addComment}>{t('comment.send')}</button>
    </div>
  )
}

CommentsForm.propTypes = {
  isAuth:PropTypes.string,
  addNewComment:PropTypes.func,
  onSignIn:PropTypes.func,
  t:PropTypes.func
};

CommentsForm.defaultProps = {
  addNewComment: () => {},
  onSignIn: () => {},
  t: () => {},
}

export default memo(CommentsForm);
