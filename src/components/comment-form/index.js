import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

function CommentForm({ title, onSubmit, submitTitle, cancelTitle, onCancel, onChange, value }) {
  const cn = bem('CommentForm');

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h3 className={cn('title')}>{title}</h3>
      <textarea 
        className={cn('text')} 
        name='text' id='text' 
        value={value}
        onChange={e => onChange(e.target.value)}></textarea>
      <div className={cn('actions')}>
        <Button style="primary" type="submit" title={submitTitle} />
        {value && <Button 
                    onClick={onCancel} 
                    type="button" 
                    style={'outline'}
                    title={cancelTitle}>
                  </Button>}
        
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  title: PropTypes.string,
  submitTitle: PropTypes.string,
  cancelTitle: PropTypes.string,
  value: PropTypes.string
};

export default memo(CommentForm);
