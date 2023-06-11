import React from 'react'
import PropTypes from 'prop-types';
import './style.css';

function Cancel({onLogin, level, isReply, onCancel}) {
  const paddings = level >= 8 ? 8 : level;

  return (
    <p style={{paddingLeft: `${30 * paddings}px` }}><button className='button-to-login' onClick={onLogin}>Войдите</button>, чтобы иметь возможность комментировать. {isReply && <button className='cancel-button' onClick={(e) => onCancel(e)}>Отмена</button>}</p>
  )
}

Cancel.propTypes = {
  isReply: PropTypes.bool,
  onLogin: PropTypes.func,
  onCancel: PropTypes.func
}

Cancel.defaultProps = {
  onLogin: () => {},
  onCancel: () => {}
}

export default Cancel