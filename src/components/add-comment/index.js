import {useState} from 'react'
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';


const AddComment = ({
  label, submitAction, onCancelReply, isLoggedIn, noAuthNavigate, commentHasChildren
}) => {
  const cn = bem('AddComment');
  const [replyText, setReplyText] = useState('')

  const handleTextAreaChange = (e) => {
    setReplyText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!replyText) return
    submitAction(replyText)
    setReplyText('')
  }

  if (isLoggedIn) {
    return (
      <div className={cn()}>
        <form onSubmit={handleSubmit} className={commentHasChildren? cn('form-padding') : cn('form')}>
          <label htmlFor='reply' className={cn('label')}>{label}</label>
          <textarea
            autoFocus={onCancelReply ? true : undefined}
            value={replyText}
            onChange={handleTextAreaChange}
            id='reply'
            name='reply'
            className={cn('textarea')}
          />
          <div className={cn('buttons')}>
            <button disabled={!replyText} type='submit' className={cn('btn')}>Отправить</button>
            {onCancelReply && <button onClick={onCancelReply} type='button' className={cn('btn')}>Отмена</button>}
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <div className={cn('no-auth')}>
        <button
        autoFocus={onCancelReply ? true : undefined}
        onClick={noAuthNavigate}
        className={cn('no-auth-btn-link')}>
          Войдите
        </button>
        <p className={cn('no-auth-text')}>, чтобы иметь возможность ответить.</p>
        {onCancelReply && <button className={cn('no-auth-btn')} onClick={onCancelReply}>Отмена</button>}
      </div>)

  }
}

AddComment.propTypes = {
  label: PropTypes.string.isRequired,
  submitAction: PropTypes.func.isRequired,
  onCancelReply: PropTypes.func,
  isLoggedIn: PropTypes.bool.isRequired,
  noAuthNavigate: PropTypes.func,
};

export default AddComment
