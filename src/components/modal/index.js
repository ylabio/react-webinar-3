import React, { useRef, useEffect } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import Cancel from '../../assets/cancel.svg';

function Modal({
  open = false,
  title = '',
  onOpen = () => {},
  onClose = () => {},
  children,
  ...props
}) {
  const cn = bem('Modal');
  const dialogRef = useRef(null);
  const dialog = dialogRef.current;

  useEffect(() => {
    if (!dialog) {
      return;
    }
    const handleClickOutside = e => {
      const rect = e.target.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        dialog.close();
      }
    };

    dialog.addEventListener('click', handleClickOutside);
    return () => {
      dialog.removeEventListener('click', handleClickOutside);
    };
  }, [dialog]);

  useEffect(() => {
    if (!dialog) {
      return;
    }
    if (open && !dialog.open) {
      dialog.showModal();
      onOpen();
    }
    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} onClose={onClose} className={cn()} {...props}>
      <button className={cn('Close')} onClick={() => dialog.close()}>
        <Cancel />
      </button>

      <div className={cn('Container')}>
        <div className={cn('Header')}>
          <h2>{title}</h2>
        </div>
        <div className={cn('Content')}>{children}</div>
        <div className={cn('Actions')}></div>
      </div>
    </dialog>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default Modal;
