import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CommentForm({addNewAnswerComment,isAuth,resetCurrentForm,t,onSignIn}) {

  let [comment , setComment] = useState('')

  function addComment(){
    if (comment.length>0){
      addNewAnswerComment(comment)
      setComment("")
      resetCurrentForm()
    }
  }
  function resetForm(){
    resetCurrentForm()
    setComment("")
  }
  if(!isAuth) return <div className='CommentForm-auth'>
    <span className='CommentForm-login' onClick={onSignIn}>{t('comment.login')}</span>, чтобы иметь возможность комментировать. <span className='CommentForm-cencel' onClick={resetForm}>{t('comment.cencel')}</span>
    </div>
  return (
    <div className='CommentForm' >
      <label className='CommentForm-label' htmlFor="CommentsFormArea">{t('comment.newAnswer')}</label>
      <textarea className='CommentForm-field' id="CommentsFormArea" value={comment} onChange={(e)=>setComment(e.currentTarget.value)}></textarea>
      <div className='CommentForm-buttons'>
        <button onClick={addComment}> {t('comment.send')}</button>
        <button onClick={resetForm}>{t('comment.cencel')}</button>
      </div>
    </div>
  )
}

CommentForm.propTypes = {
  isAuth:PropTypes.string,
  addNewAnswerComment:PropTypes.func,
  resetCurrentForm:PropTypes.func,
  onSignIn:PropTypes.func,
  t:PropTypes.func,
};

CommentForm.defaultProps = {
  addNewAnswerComment: () => {},
  resetCurrentForm: () => {},
  t:()=>{},
  onSignIn:()=>{}
}

export default memo(CommentForm);
