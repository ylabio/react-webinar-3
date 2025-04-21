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
  secondButtonTitle = '',
  secondButtonFunc = () => {},
}) {
  const cn = bem('Form');

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h2 className={cn('title')}>{title}</h2>
      {children}
      <div className={cn('footer')}>
        <Button style="primary" type="submit" title={submitTitle} />
        {secondButtonTitle && (
          <Button
            onClick={() => secondButtonFunc('')}
            style="outline"
            type="button"
            title={secondButtonTitle}
          />
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
