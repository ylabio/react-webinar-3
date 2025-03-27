import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../close-icon';
import ModalOverlay from '../modal-overlay';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Modal = ({ children, onClose }) => {
  const cn = bem('Modal');

  const handleModalClick = event => {
    event.stopPropagation();
  };

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    const closeByEsc = evt => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeByEsc);
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, [onClose]);

  return (
    <ModalOverlay onClick={closeModal}>
      <div className={cn()} onClick={handleModalClick}>
        <div className={cn('content')}>
          <button className={cn('icon')} onClick={closeModal}>
            <CloseIcon />
          </button>
          {children}
        </div>
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
