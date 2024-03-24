import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function CommentsForm({addNewComment,isAuth}) {

  let [comment , setComment] = useState('')

  function addComment(){
    addNewComment(comment)
    setComment("")
  }
  if(!isAuth) return <div className='CommentsForm-auth'><Link to={'/login'}>Войдите</Link>, чтобы иметь возможность комментировать</div>
  return (
    <div className='CommentsForm' >
      <label className='CommentsForm-label' htmlFor="CommentsFormArea">Новый комментарий</label>
      <textarea className='CommentsForm-field' id="CommentsFormArea" value={comment} onChange={(e)=>setComment(e.currentTarget.value)}></textarea>
      <button onClick={addComment}>Отправить</button>
    </div>
  )
}

CommentsForm.propTypes = {

};

CommentsForm.defaultProps = {
  addNewComment: () => {},
}

export default memo(CommentsForm);
