import { memo, useEffect, useRef } from "react";
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
  const scrollRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick?.();
  };

  useEffect(() => {
    if (onClickCancel) {
      scrollRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, []);

  return (
    <form ref={scrollRef} onSubmit={handleSubmit} className={cn()}>
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
          style={`primary${value === '' ? " disabled" : ""}`}
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
