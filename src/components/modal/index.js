import CloseIcon from './images/close.svg';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay';
import './style.css';

const Modal = props => {
  useEffect(() => {
    if (!props.open) return;

    const handleEscClose = e => {
      if (e.key === 'Escape') {
        props.close();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [props.close, props.open]);

  if (!props.open) {
    return null;
  }

  return (
    <ModalOverlay close={props.close}>
      <div className="Modal" onClick={e => e.stopPropagation()}>
        <button
          className="Close"
          type="button"
          aria-label="закрыть модальное окно"
          onClick={props.close ?? (() => {})}
        >
          <CloseIcon type="primary" />
        </button>
        {props.title && <p className="Title">{props.title}</p>}
        {props.children ?? null}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  close: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
