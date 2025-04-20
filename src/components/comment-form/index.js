import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import Button from '../button';
import Textarea from '../textarea';

import './style.css';

function CommentForm({ title, value, onChange, onSubmit, submitTitle, onCancel, cancelTitle }) {
  const cn = bem('CommentForm');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = value => {
    onChange(value);
  };

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h3 className={cn('title')}>{title}</h3>
      <Textarea name="reply" value={value} onChange={handleChange} rows={4} />
      <div className={cn('buttons')}>
        <Button style="primary" type="submit" title={submitTitle} disabled={!value.trim()} />
        {onCancel && (
          <Button style="outline" type="button" title={cancelTitle} onClick={onCancel} />
        )}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string.isRequired,
  submitTitle: PropTypes.string.isRequired,
  cancelTitle: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default memo(CommentForm);
