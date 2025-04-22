import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

function Form({ title, onSubmit, children, submitTitle, onCancel, cancelTitle, titleType = 'normal' }) {
  const cn = bem('Form');

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h2 className={cn('title', { titleType })}>{title}</h2>
      {children}
      <div className={cn('actions')}>
        <Button style="primary" type="submit" title={submitTitle} />
          {onCancel &&
        <Button style="outline" type="button" title={cancelTitle} onClick={onCancel}/>
        }
      </div>
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  submitTitle: PropTypes.string,
  onCancel: PropTypes.func,
  cancelTitle: PropTypes.string
};

export default memo(Form);
