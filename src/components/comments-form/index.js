import { memo } from "react";
import Button from "../button";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsForm({ title, value, titleButton, onChange, onClick }) {
  const cn = bem('CommentsForm');
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <div className={cn('title')}>{title}</div>
        <textarea
          value={value}
          className={cn('text')}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button
          title={titleButton}
          style={'primary'}
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default memo(CommentsForm);
