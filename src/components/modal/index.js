import React from 'react';
import PropTypes, { object } from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({title, modalRef, modalBody = () => null}) {
  const cn = bem('Modal');

  return (
    <dialog className={cn()} ref={modalRef} >
      <div className={cn('header')}>
        <h3 className={cn('title')}>{title}</h3>
        <button onClick={() => modalRef.current?.close()}>Закрыть</button>
      </div>
      <div>
        {modalBody()}
      </div>
    </dialog>
  )
}

Modal.prototype = {
  modalRef: PropTypes.ref
}

export default Modal;
