import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function CommentForm({addNewAnswerComment,isAuth,resetCurrentForm}) {

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
    <Link to={'/login'}>Войдите</Link>, чтобы иметь возможность комментировать. <span onClick={resetForm}>Отмена</span>
    </div>
  return (
    <div className='CommentForm' >
      <label className='CommentForm-label' htmlFor="CommentsFormArea">Новый ответ</label>
      <textarea className='CommentForm-field' id="CommentsFormArea" value={comment} onChange={(e)=>setComment(e.currentTarget.value)}></textarea>
      <div className='CommentForm-buttons'>
        <button onClick={addComment}>Отправить</button>
        <button onClick={resetForm}>Отмена</button>
      </div>
    </div>
  )
}

CommentForm.propTypes = {

};

CommentForm.defaultProps = {
  addNewAnswerComment: () => {},
}

export default memo(CommentForm);
