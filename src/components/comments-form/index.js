import { memo } from "react";
import Button from "../button";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsForm({
  title,
  titleButtonSend,
  titleButtonCancel,
  value,
  onChange,
  onClick,
  onClickCancel
}) {
  const cn = bem('CommentsForm');

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick?.();
  };

  return (
    <form onSubmit={handleSubmit} className={cn()}>
      <div className={cn('title')}>{title}</div>
      <textarea
        className={cn('text')}
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        required
      />
      <div className={cn('form-actions')}>
      <Button 
          type="submit" 
          style="primary" 
          title={titleButtonSend} 
          onClick={() => {}}
        />
        {onClickCancel && (
          <Button 
            type="button"
            style="cancel"
            title={titleButtonCancel}
            onClick={onClickCancel}
          />
        )}
      </div>
    </form>
  );
}

export default memo(CommentsForm);
