import PropTypes from 'prop-types';
import { memo, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom';

const ArticleCommentReplyForm = ({ 
  title, 
  isLoggedIn, 
  pathname, 
  link,  
  commentParentId, 
  onAddComment, 
  handleCommentForm,
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
        parent: {
          _id: commentParentId,
          _type: "comment"
        }
      }
      onAddComment(data)
      setTextValue('')
      callbacks.closeReplyForm()
    },
    closeReplyForm: () => handleCommentForm(prev => prev = {
      form: 'comment', 
      commentIndex: null
    })
  }

  return (
    <div className='ArticleCommentReplyForm-wrapper'>
      {isLoggedIn ? (
        <form className='ArticleCommentReplyForm' onSubmit={callbacks.onSubmit}>
        <label htmlFor='commentTextArea' className='ArticleCommentReplyForm-title'>
          Новый {title}
        </label>
  
        <textarea id='commentTextArea' name='commentContent' value={textValue} 
        onChange={callbacks.handleChangeText} className='ArticleCommentReplyForm-textarea' />
  
        <div className='ArticleCommentReplyForm-controls'>
          <button type='submit' className='ArticleCommentReplyForm-submit-btn'>
            Отправить
          </button>
          <button 
            onClick={callbacks.closeReplyForm}  className='ArticleCommentReplyForm-cancel-btn'>
              Отмена
          </button>
        </div>
      </form>
      ) : (
        <div className="ArticleCommentReplyForm-subtitle">
          <Link className="ArticleComments-signin-link" to={link} state={{back: pathname}}>Войдите</Link>
          , чтобы иметь возможность ответить. {' '}
          <button onClick={callbacks.closeReplyForm} className='ArticleCommentReplyForm-subtitle-cancel-btn'>Отмена</button>
        </div>
      )}
    </div>
    
  )
}

ArticleCommentReplyForm.propTypes = {
  title: PropTypes.string,
  commentParentId:PropTypes.string,
  isLoggedIn: PropTypes.bool,
  link: PropTypes.string,
  pathname: PropTypes.string,
  onAddComment: PropTypes.func,
  handleCommentForm: PropTypes.func,
}

export default memo(ArticleCommentReplyForm)