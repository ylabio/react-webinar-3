import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style.css';
import CloseButton from "../close-button";
import {cn as bem} from "@bem-react/classname";

const Modal = ({ children, isOpen, onClose = () => {} }) => {
  const cn = bem('Modal');

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={cn('overlay')} onClick={onClose}>
      <div className={cn()} onClick={(e)=> e.stopPropagation()} >
        <div className={cn('header')}>
          <h2 className={cn('title')}>Корзина</h2>
          <CloseButton onClick={onClose} />
        </div>
        <div className={cn('content')}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.element.isRequired
};

export default React.memo(Modal);
