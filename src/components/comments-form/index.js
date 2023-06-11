import {memo, useEffect} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function CommentsForm({value, isReply, onChange, onSubmit, onCancel}) {
  const cn = bem('CommentForm');

  // Не получается удалить u3164, попробовал разные способы
  // Такая же проверка есть в comments-form-container
  const isButtonDisabled = value.trim().replace(/\s/g,'').length == 0 ? true : false;

  return (
    <form className={cn()} onSubmit={(e) => onSubmit(e)}>
      <h3 className={cn('title')}>{isReply ? 'Новый ответ' : "Новый комментарий"}</h3>

      <textarea className={cn('textarea')} value={value} onChange={(e) => onChange(e.target.value, 'value')}></textarea>

      <div>
        <input className={cn('submit')} type='submit' value="Отправить" disabled={isButtonDisabled} />
        {isReply && <button onClick={(e) => onCancel(e)}>Отмена</button>}
      </div>

    </form>
  )
}

CommentsForm.propTypes = {
  value: PropTypes.string,
  isReply: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

CommentsForm.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  onCancel: () => {},
}

export default memo(CommentsForm)