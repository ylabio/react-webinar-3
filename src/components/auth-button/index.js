import React from 'react'
import './style.css'

const AuthButton = ({onAction, buttonTitle}) => {

  const callbacks = {onClick: () => onAction() }

  return (
    <button
      className='AuthButton'
      onClick={callbacks.onClick}
    >
      {buttonTitle}
    </button>
  )
}

export default AuthButton