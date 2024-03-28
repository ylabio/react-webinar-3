import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { memo } from 'react';

function CommentsLayout({ count, children, t }) {
  const cn = bem('CommentsLayout');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {t('comments.title')} ({count})
      </div>
      {children}
    </div>
  )
}

CommentsLayout.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  t: PropTypes.func
}

export default memo(CommentsLayout);