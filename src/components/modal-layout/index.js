import React from 'react'
import PropTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function ModalLayout({ isModalActive, children }) {
  const cn = bem('Modal')

  return (
    <div className={`${cn()} ${isModalActive ? 'active' : ''}`}>
      <div className={cn('window')}>{children}</div>
    </div>
  )
}

ModalLayout.propTypes = {
  isModalActive: PropTypes.bool,
  children: PropTypes.node,
}

export default React.memo(ModalLayout)
