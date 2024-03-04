import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { useEffect } from "react";
import { createPortal } from 'react-dom';

function Modal({children, title, setModalIsOpen, modalIsOpen}) {
  const cn = bem('Modal');

  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflowY = 'hidden';
    }
  
    return () => {
      document.body.style.overflowY = 'unset';
    };
  }, [modalIsOpen])

  if (!modalIsOpen || !modalRoot) {
    return null;
  }

  return createPortal(
    (
      <div className={cn({open: modalIsOpen})} onClick={() => setModalIsOpen(false)}>
          <div className={cn('content')} onClick={event => event.stopPropagation()}>
            <div className={cn('header')}>
              <h2 className={cn('title')}>{title}</h2>
              <button onClick={() => setModalIsOpen(false)}>Закрыть</button>
            </div>
            {children}
          </div>
      </div>), modalRoot
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  modalIsOpen: PropTypes.bool,
  setModalIsOpen: PropTypes.func
};

Modal.defaultProps = {
  modalIsOpen: false,
  setModalIsOpen: () => {}
}


export default React.memo(Modal);
