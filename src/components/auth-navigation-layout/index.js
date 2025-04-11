import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import './style.css';

function AuthNavigationLayout({ children }) {
  const cn = bem('AuthNavigationLayout');
  return (
    <div className={cn()}>
      <div className={cn('container')}>{children}</div>
    </div>
  );
}

AuthNavigationLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(AuthNavigationLayout);
