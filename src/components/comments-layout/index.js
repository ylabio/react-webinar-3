import React, { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsLayout({ children, padding}) {
  const cn = bem('CommentsLayout');
  return (
    <div className={cn(padding)}>
      {children}
    </div>
  );
}

CommentsLayout.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.oneOf(['small', 'medium', 'none']),
  id: PropTypes.number
}

CommentsLayout.defaultProps = {};

export default memo(CommentsLayout);
