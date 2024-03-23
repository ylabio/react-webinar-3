import { cn as bem } from '@bem-react/classname';
import './style.css';
import { memo } from 'react';

function CommentsLayout({ count, children }) {
  const cn = bem('CommentsLayout');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        Комментарии ({count})
      </div>
      {children}
    </div>
  )
}

export default memo(CommentsLayout);