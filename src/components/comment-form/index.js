import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';

function CommentForm({ onSubmit, onCancel, title, placeholder, value, onChange }) {
  const cn = bem('CommentForm');

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
    }
  };

  return (
    <div className={cn()}>
      <form onSubmit={handleSubmit}>
        <h3>{title}</h3>
        <div className={cn('area')}>
          <textarea value={value} onChange={onChange} placeholder={placeholder} required />
        </div>
        <div className={cn('actions')}>
          <Button type="submit" style="primary" title="Отправить" />
          {onCancel && <Button type="button" style="outline" onClick={onCancel} title="Отмена" />}
        </div>
      </form>
    </div>
  );
}

export default memo(CommentForm);
