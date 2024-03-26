import PropTypes from 'prop-types';
import { memo, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom';

const ArticleCommentForm = ({  
  commentParent, 
  isLoggedIn, 
  pathname, 
  link, 
  onAddComment,
  t
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
          {t('article.commentaryForm-title')}  
        </label>

        <textarea id='commentTextArea' name='commentContent' value={textValue} 
          onChange={callbacks.handleChangeText} className='ArticleCommentForm-textarea' />

        <button type='submit' className='ArticleCommentForm-submit-btn'>
          {t('article.commentaryForm-submit')}
        </button>
      </form>
      ) : (
        <div className="ArticleComments-subtitle">
          <Link className="ArticleComments-signin-link" to={link} state={{back: pathname}}>{t('article.commentaryForm-ifnotlogedin').split(',')[0]}</Link>
          ,{t('article.commentaryForm-ifnotlogedin').split(',')[1]}
        </div>
      )
    }
    </>
  )
}

ArticleCommentForm.propTypes = {
  commentParent: PropTypes.shape({
    _id: PropTypes.string,
    _type: PropTypes.string,
  }),
  isLoggedIn: PropTypes.bool,
  pathname: PropTypes.string,
  link: PropTypes.string,
  onAddComment: PropTypes.func,
  t: PropTypes.func
}

export default memo(ArticleCommentForm)