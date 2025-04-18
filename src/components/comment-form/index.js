import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';

function CommentForm({ onSubmit, onCancel, title, placeholder }) {
  const cn = bem('CommentForm');
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <div className={cn()}>
      <form onSubmit={handleSubmit}>
        <h3>{title}</h3>
        <div className={cn('area')}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={placeholder}
            required
          />
        </div>
        <div className={cn('actions')}>
          <Button type="submit" style="primary" title="Отправить" />
          {onCancel && <Button type="button" style="secondary" onClick={onCancel} title="Отмена" />}
        </div>
      </form>
    </div>
  );
}

export default memo(CommentForm);
