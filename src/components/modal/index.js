import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
function Modal({ className, children }) {
  const cn = bem('Modal');

  return (
    <div className={className}>
      <div className={cn('center')}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Modal);
