import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import Button from '../button';
import './style.css';

function Form({
  title,
  onSubmit,
  children,
  submitTitle,
  resetButton = false,
  onReset,
  margin = 'big',
  titleSize = 'big',
}) {
  const cn = bem('Form');

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h2 className={cn('title', { margin, titleSize })}>{title}</h2>
      {children}
      <div className={cn('buttons', { margin })}>
        <Button style="primary" type="submit" title={submitTitle} />
        {resetButton && <Button style="outline" type="button" title="Отмена" onClick={onReset} />}
      </div>
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  submitTitle: PropTypes.string,
  resetButton: PropTypes.bool,
  onReset: PropTypes.func,
  margin: PropTypes.oneOf(['medium', 'big']),
  titleSize: PropTypes.oneOf(['medium', 'big']),
};

export default memo(Form);
