import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({title, isOpen, close, children, foot}) {

  const cn = bem('Modal')

  useEffect(() => {
    isOpen ? document.body.classList.add('Modal-open') : document.body.classList.remove('Modal-open');
  }, [isOpen])

  return (
    <>
      <div className={`${cn()} ${isOpen ? 'active' : ''}`}>
        <div className={cn('head')}>
          <h1>{title}</h1>
          <button onClick={close}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
        <div className={cn('foot')}>
          {foot}
        </div>
      </div>
      <div className={`${cn('overlay')} ${isOpen ? 'active' : ''}`} onClick={close}></div>
    </>
  )
}

Modal.PropTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.node,
}

export default React.memo(Modal);