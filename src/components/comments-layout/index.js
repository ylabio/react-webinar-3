import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsLayout({ children, gap, isPaddingLeft = false }) {
  const cn = bem('CommentsLayout');
  return (
    <div className={cn({ gap, isPaddingLeft })}>
      {children}
    </div>
  );
}

CommentsLayout.PropTypes = {
  children: PropTypes.node,
}

export default memo(CommentsLayout);
