import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Modal({ children }) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('content')}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
