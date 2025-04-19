import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsLayout({ children }) {
  const cn = bem('CommentsLayout');
  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

CommentsLayout.PropTypes = {
  children: PropTypes.node,
}

export default memo(CommentsLayout);
