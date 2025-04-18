import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import PropTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function CommentForm({ onSubmit, onCancel, title }) {
  const cn = bem('CommentForm');
  const { t } = useTranslate();
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      {title && <div className={cn('title')}>{title}</div>}
      <textarea className={cn('text')} value={text} onChange={e => setText(e.target.value)} />
      <div className={cn('buttons')}>
        <Button type="submit" style="primary" title={t('comments.send')}></Button>
        {onCancel && text.length > 0 && (
          <Button style="outline" onClick={onCancel} title={t('comments.cancel')}></Button>
        )}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  title: PropTypes.string,
};

export default memo(CommentForm);
