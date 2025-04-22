import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';

function CommentsLayout({ title = 'Комментарии', count, children }) {
  const cn = bem('CommentsLayout');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>
        {title} ({count})
      </h2>
      {children}
    </div>
  );
}

CommentsLayout.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  children: PropTypes.node,
};

export default memo(CommentsLayout);
