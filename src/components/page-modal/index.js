import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PageModal({ isVisible = false, children }) {
  const cn = bem('PageModal');

  return (
    isVisible &&
      <div className={cn()}>
        <div className={cn('overlay')}></div>
        {children}
      </div>
  );
}

PageModal.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.node,
};

export default React.memo(PageModal);
