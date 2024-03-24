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
  if(!isAuth) return <div className='CommentsForm-auth'><Link to={'/login'}>Войдите</Link> , чтобы иметь возможность комментировать</div>
  return (
    <div className='CommentsForm' >
      <label className='CommentsForm-label' htmlFor="CommentsFormArea">Новый комментарий</label>
      <textarea className='CommentsForm-field' id="CommentsFormArea" value={comment} onChange={(e)=>setComment(e.currentTarget.value)}></textarea>
      <button onClick={addComment}>Отправить</button>
      <button onClick={resetForm}>Отмена</button>
    </div>
  )
}

CommentForm.propTypes = {

};

CommentForm.defaultProps = {
  addNewAnswerComment: () => {},
}

export default memo(CommentForm);
