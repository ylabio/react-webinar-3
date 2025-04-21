import { memo, useState } from 'react';
import './style.css';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

function AddComment(props) {
  const { t = text => text, addComment = () => {}, cancelComment = () => {}, id } = props;
  const [text, setText] = useState('');

  const handleChange = event => {
    setText(event.target.value);
  };

  const onAddComment = () => {
    addComment(id, text);
  };

  const cn = bem('AddComment');

  return (
    <div className={cn()}>
      <div className={cn('text__bold')}>{t('Новый комментарий')}</div>
      <textarea rows={4} value={text} onChange={handleChange} className={cn('textarea')} />
      <div className={cn('actions')}>
        <Button title={t('Отправить')} style={'primary'} onClick={onAddComment} disabled={!text.trim()} />
        <Button title={t('Отмена')} style={'outline'} onClick={cancelComment} />
      </div>
    </div>
  );
}

AddComment.propTypes = {
  t: PropTypes.func,
  addComment: PropTypes.func,
  cancelComment: PropTypes.func,
  id: PropTypes.string,
};

export default memo(AddComment);
