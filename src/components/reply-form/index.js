import {memo, forwardRef} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

const ReplyForm = forwardRef(({id, level, onSubmit, onCancel, t}, ref) => {
  const cn = bem('ReplyForm');

  return (
    <form className={cn()} ref={ref} onSubmit={onSubmit} style={(id && level < 10) ? { paddingLeft: 30} : {}}>
      <p className={cn('title')}>{id ? t('comments.newReply') : t('comments.newComment')}</p>
      <textarea className={cn('textarea')} name='comment' />
      <div>
        <button type='submit' className={cn('submit')}>{t('comments.send')}</button>
        {id && <button type='reset' onClick={onCancel}>{t('comments.cancel')}</button>}
      </div>
    </form>
  )
})

ReplyForm.propTypes = {
  id: PropTypes.string,
  level: PropTypes.number,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  t: PropTypes.func,
};

ReplyForm.defaultProps = {
  id: '',
  level: 0,
  onSubmit: () => {},
  onCancel: () => {},
  t: () => {},
}

export default memo(ReplyForm);
