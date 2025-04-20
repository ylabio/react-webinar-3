import { memo, useState, useEffect, useRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.css';

function NewComment({ onSubmit, onCancel, autoFocus = false }) {
  const cn = bem('NewComment');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);

  // Автофокус при монтировании
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(text);
      setText('');
    } catch (error) {
      console.error('Ошибка при отправке комментария:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setText('');
    onCancel?.();
  };

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h3 className={cn('title')}>Новый комментарий</h3>
      <textarea
        ref={textareaRef}
        className={cn('textarea')}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите ваш комментарий..."
        rows={4}
        minLength={3}
        maxLength={1000}
        disabled={isSubmitting}
        required
      />
      <div className={cn('controls')}>
        <Button
          type="submit"
          style="primary"
          disabled={!text.trim() || isSubmitting}
          label={isSubmitting ? 'Отправка...' : 'Отправить'}
        />
        {onCancel && (
          <Button
            type="button"
            style="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            label="Отмена"
          />
        )}
      </div>
    </form>
  );
}

NewComment.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  autoFocus: PropTypes.bool // Добавляем проп для автофокуса
};

export default memo(NewComment);
