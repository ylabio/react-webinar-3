import { memo } from 'react';
import PropTypes from 'prop-types';
import Form from '../form';
import Textarea from '../textarea';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function CommentsForm({
  onSubmit = () => {},
  t,
  style,
  option,
  onClick = () => {},
  onChange = () => {},
  value,
  success,
}) {
  const cn = bem('CommentsForm');

  return (
    <div className={cn()}>
      <Form
        onSubmit={onSubmit}
        submitTitle={t('comments.send')}
        title={t('comments.answer-title')}
        cancelTitle={t('comments.cancel')}
        style={style}
        option={option}
        onClick={onClick}
      >
        <Textarea value={value} onChange={onChange} />
        {!success && <span className={cn('error')}>{t('comments.error')}</span>}
      </Form>
    </div>
  );
}

CommentsForm.propTypes = {
  t: PropTypes.func,
  style: PropTypes.string,
  value: PropTypes.string,
  option: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default memo(CommentsForm);
