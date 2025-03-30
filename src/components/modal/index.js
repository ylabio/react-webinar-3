import React, { useRef, useEffect } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Head from '../head';
import ModalHead from '../modal-head';
import PropTypes from 'prop-types';

function Modal({ title, isOpen, onClose = () => {}, children }) {
  const dialogRef = useRef(null);
  const cn = bem('Modal');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isOpen]);

  return (
    <dialog className={cn()} ref={dialogRef} onClose={onClose} onClick={onClose}>
      <div className={cn('main')} onClick={e => e.stopPropagation()}>
        <ModalHead title={title} onClose={onClose} />
        <section className={cn('item')}>{children}</section>
        {/*{children}*/}
      </div>
    </dialog>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
