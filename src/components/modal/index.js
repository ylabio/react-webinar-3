import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import IconClose from '../icons/icon-close';
import './style.css';

function Modal({ children, onCloseModal = () => {} }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const onEscKeydown = evt => {
      if (evt.key === 'Escape') {
        onCloseModal();
      }
    };
    document.addEventListener('keydown', onEscKeydown);
    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, [onCloseModal]);

  return (
    <div className="ModalOverlay" onClick={onCloseModal}>
      <div className="Modal" onClick={e => e.stopPropagation()}>
        <button className='CloseIcon' onClick={onCloseModal}>
          <IconClose />
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(Modal);
