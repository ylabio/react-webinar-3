import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function CommentForm({addNewAnswerComment,isAuth,resetCurrentForm,t}) {

  let [comment , setComment] = useState('')

  function addComment(){
    addNewAnswerComment(comment)
    setComment("")
    resetCurrentForm()
  }
  function resetForm(){
    resetCurrentForm()
    setComment("")
  }
  if(!isAuth) return <div className='CommentForm-auth'>
    <Link to={'/login'}>{t('comment.login')}</Link>, чтобы иметь возможность комментировать. <span onClick={resetForm}>{t('comment.cencel')}</span>
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
  t:PropTypes.func,
};

CommentForm.defaultProps = {
  addNewAnswerComment: () => {},
  resetCurrentForm: () => {},
  t:()=>{}
}

export default memo(CommentForm);
