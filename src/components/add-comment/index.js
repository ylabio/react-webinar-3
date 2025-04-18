import { memo, useState } from 'react';
import './style.css';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';

function AddComment(props) {
  const { t = text => text, addComment = () => {}, id } = props;
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
      <Button title={t('Отправить')} style={'primary'} onClick={onAddComment} />
    </div>
  );
}

export default memo(AddComment);
