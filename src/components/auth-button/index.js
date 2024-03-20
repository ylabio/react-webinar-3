import {memo} from 'react'
import './style.css'
import PropTypes from 'prop-types';

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

AuthButton.propTypes = {
  onAction: PropTypes.func,
  buttonTitle: PropTypes.string
};

AuthButton.defaultProps = {
  onAction: () => {},
  buttonTitle: ''
}

export default memo(AuthButton)