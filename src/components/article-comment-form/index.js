import PropTypes from 'prop-types';
import { memo, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom';

const ArticleCommentForm = ({ 
  title, 
  commentParent, 
  isLoggedIn, 
  pathname, 
  link, 
  onAddComment 
}) => {
  const [textValue, setTextValue] = useState('')

  const callbacks = {
    handleChangeText: (e) => setTextValue(e.target.value),
    onSubmit: (e) => {
      e.preventDefault()
      if(textValue === '') return; 
      const form = e.target
      const formData = new FormData(form);
      const data = {
        text: formData.get('commentContent'),
        parent: commentParent
      }
      onAddComment(data)
      setTextValue('')
    } 
  }

  return (
    <>
    {isLoggedIn ? (
      <form className='ArticleCommentForm' onSubmit={callbacks.onSubmit}>
        <label htmlFor='commentTextArea' className='ArticleCommentForm-title'>
          Новый {title}
         </label>

        <textarea id='commentTextArea' name='commentContent' value={textValue} 
          onChange={callbacks.handleChangeText} className='ArticleCommentForm-textarea' />

        <button type='submit' className='ArticleCommentForm-submit-btn'>Отправить</button>
      </form>
      ) : (
        <div className="ArticleComments-subtitle">
          <Link className="ArticleComments-signin-link" to={link} state={{back: pathname}}>Войдите</Link>
          , чтобы иметь возможность комментировать
        </div>
      )
    }
    </>
  )
}

ArticleCommentForm.propTypes = {
  title: PropTypes.string,
  commentParent: PropTypes.shape({
    _id: PropTypes.string,
    _type: PropTypes.string,
  }),
  isLoggedIn: PropTypes.bool,
  pathname: PropTypes.string,
  link: PropTypes.string,
  onAddComment: PropTypes.func
}

export default memo(ArticleCommentForm)