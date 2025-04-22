import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsLayout({ children, gap = 'large', isPaddingLeft = false  }) {
  const cn = bem('CommentsLayout');
  return (
    <div className={cn({ gap, isPaddingLeft })}>
      {children}
    </div>
  );
}

CommentsLayout.PropTypes = {
  children: PropTypes.node,
  gap: PropTypes.oneOf(['medium', 'large']),
  isPaddingLeft: PropTypes.bool,
}

export default memo(CommentsLayout);
