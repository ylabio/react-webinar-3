import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

function Form({
  title,
  onSubmit,
  children,
  submitTitle,
  style = '',
  option = '',
  cancelTitle,
  onClick = () => {},
}) {
  const cn = bem('Form');

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h2 className={cn({ theme: style })}>{title}</h2>
      {children}

      <div className={cn('action')}>
        <Button style="primary" type="submit" title={submitTitle} />
        {option === 'cancel' && (
          <Button style="outline" type="button" title={cancelTitle} onClick={onClick} />
        )}
      </div>
    </form>
  );
}
Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  submitTitle: PropTypes.string,
};
export default memo(Form);
