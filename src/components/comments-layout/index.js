import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsLayout({ count, children, t }) {
  const cn = bem('CommentsLayout');

  return (
    <div className={cn()}>
      <h3 className={cn('title')}>
        {t('comment.comments')} ({count})
      </h3>
      {children}
    </div>
  );
}

CommentsLayout.propsType = {
  children: PropTypes.node,
  count: PropTypes.number,
};

export default memo(CommentsLayout);
