import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PageLayout({ children, nonScroll = false }) {
  const cn = bem('PageLayout');

  return (
    <div className={cn({nonScroll: nonScroll})}>
      <div className={cn('center')}>{children}</div>
    </div>
  );
}

PageLayout.propTypes = {
  nonScroll: PropTypes.bool,
  children: PropTypes.node,
};

export default React.memo(PageLayout);
