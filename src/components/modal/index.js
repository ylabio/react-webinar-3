import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CloseIcon from '../cart-close-icon';

function Modal({ children, onClose }) {
  const cn = bem('Modal');

  return (
    <div className={cn('overlay')}>
      <div className={cn()}>
        <button className={cn('close')} onClick={onClose}>
          {onClose && <CloseIcon />}
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(Modal);