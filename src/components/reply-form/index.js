import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ReplyForm({id, onSubmit, onCancel}) {
  const cn = bem('ReplyForm');

  return (
    <form className={cn()}  onSubmit={onSubmit}>
      <p className={cn('title')}>{id ? 'Новый ответ' : 'Новый комментарий'}</p>
      <textarea className={cn('textarea')} name='comment' />
      <div>
        <button type='submit' className={cn('submit')}>Отправить</button>
        {id && <button type='reset' onClick={onCancel}>Отмена</button>}
      </div>
    </form>
  )
}

ReplyForm.propTypes = {
  id: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

ReplyForm.defaultProps = {
  id: '',
  onSubmit: () => {},
  onCancel: () => {},
}

export default memo(ReplyForm);
