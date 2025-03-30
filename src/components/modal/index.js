import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CancelIcon from '../../assets/icons/Cancel.svg';

function Modal({ children, onClose = () => {} }) {
  const cn = bem('Modal');

  return (
    <div className={cn()} onClick={onClose}>
      <div className={cn('Container')} onClick={e => e.stopPropagation()}>
        <div className={cn('Container-close')} onClick={onClose}>
          <CancelIcon width={32} height={32} />
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default React.memo(Modal);
