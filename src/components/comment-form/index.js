import { memo } from 'react';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

import './style.css';

function CommentForm({
  t = () => {},
  action = () => {},
  title,
  placeholder,
  cancel,
  onCancel = () => {},
  children,
}) {
  const cn = bem('CommentForm');
  return (
    <div className={cn()}>
      <form onSubmit={action}>
        <h3>{title}</h3>
        {children}
        <div className={cn('area')}>
          <textarea name="text" id="text" placeholder={placeholder} />
        </div>
        <div className={cn('actions')}>
          <Button type="submit" style={'primary'} title={t('article.send')} />
          {cancel && (
            <Button
              onClick={onCancel}
              type="button"
              style={'cancel'}
              title={t('article.cancel')}
            ></Button>
          )}
        </div>
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  cancel: PropTypes.string,
  onCancel: PropTypes.func,
  action: PropTypes.func,
  childern: PropTypes.node,
};
export default memo(CommentForm);
