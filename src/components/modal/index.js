import React from 'react'
import PropTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function Modal({ children, setModal }) {
  const cn = bem('Modal')

  return (
    <div className={cn()}>
      <div className={cn('center')}>{children}</div>
      <div className={cn('bg')} onClick={() => setModal(false)}></div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  setModal: PropTypes.func
}

export default React.memo(Modal)
