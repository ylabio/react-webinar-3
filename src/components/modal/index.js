import React from 'react';
import PropTypes from 'prop-types';
import './style.css';



const Modal = ({
                 children,
                 isOpen,
                 onClose,
                 Icon
}) => {
  console.log('modal')
  const handleKeyDown = (e) => {
    if (e.keyCode === 27 && isOpen) {
      onClose();
    }
  };

  const handleClickOverlay = (e) => {
    if (isOpen && e.target.classList.contains('Modal-overlay')) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {isOpen && (
        <div className="Modal-overlay" onClick={handleClickOverlay}>
          <div className="Modal-content">
            <button className="Modal-close-button" onClick={onClose}>
              <Icon/>
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  Icon: PropTypes.elementType.isRequired
};

export default Modal;
