import React from 'react'
import { cn as bem } from '@bem-react/classname'
import PropTypes from 'prop-types'
import './style.css'

const Modal = (props) => {
  const cn = bem('Modal')
  return (
    <div className={cn({ 'active': props.active })}>
      <div className={cn('content')}>{props.children}</div>
    </div>
  )
}

Modal.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node 
}

export default React.memo(Modal)
