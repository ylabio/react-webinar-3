import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({isOpen, onClose, children}) {

  const modalRef = useRef(null);

  useEffect(() =>{
    const modal = modalRef.current;

    const onEsc = (e) => {
      if(e.keyCode === 27) onClose();
    }

    const onOuterClick = () => {
      modal.close();
      onClose();
    }

    if(isOpen) {
      modal.showModal();
      window.addEventListener('keydown', onEsc);
      window.addEventListener('click', onOuterClick);
    }

    !isOpen && modal.open && modal.close();

    return () => {
      window.removeEventListener('keydown', onEsc);
      window.removeEventListener('click', onOuterClick);
    }
  }, [isOpen]);

  return (
    <dialog className='Modal' ref={modalRef}>
      <div className='Modal-cage' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(Modal);