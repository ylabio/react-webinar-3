import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({title, isOpen, close, children}) {

  const cn = bem('Modal')

  return (
    <>
      <div className={`${cn()} ${isOpen ? 'active' : ''}`}>
        <div className={cn('head')}>
          <h1>{title}</h1>
          <button onClick={close}>Закрыть</button>
        </div>
        {children}
      </div>
      <div className={`${cn('overlay')} ${isOpen ? 'active' : ''}`} onClick={close}></div>
    </>
  )
}

Modal.PropTypes = {}

export default React.memo(Modal);