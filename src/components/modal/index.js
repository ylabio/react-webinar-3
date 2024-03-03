import React from 'react'
import './style.css';

function Modal({children, style}) {
  return (
    <div className='Modal' {...style}>
      <div className='Modal-content'>{children}</div>
    </div>
  )
}

export default Modal