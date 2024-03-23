import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ReplyForm({id, onSubmit, onCancel, t}) {
  const cn = bem('ReplyForm');

  return (
    <form className={cn()}  onSubmit={onSubmit}>
      <p className={cn('title')}>{id ? t('comments.newReply') : t('comments.newComment')}</p>
      <textarea className={cn('textarea')} name='comment' />
      <div>
        <button type='submit' className={cn('submit')}>{t('comments.send')}</button>
        {id && <button type='reset' onClick={onCancel}>{t('comments.cancel')}</button>}
      </div>
    </form>
  )
}

ReplyForm.propTypes = {
  id: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  t: PropTypes.func,
};

ReplyForm.defaultProps = {
  id: '',
  onSubmit: () => {},
  onCancel: () => {},
  t: () => {},
}

export default memo(ReplyForm);
