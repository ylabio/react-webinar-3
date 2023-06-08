import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import './style.css';

function Cancel({url, isReply, onCancel}) {
  return (
    <p><Link to={url}>Войдите</Link>, чтобы иметь возможность комментировать. {isReply && <button className='cancel-button' onClick={(e) => onCancel(e)}>Отмена</button>}</p>
  )
}

Cancel.propTypes = {
  url: PropTypes.string,
  isReply: PropTypes.bool,
  onCancel: PropTypes.func
}

Cancel.defaultProps = {
  onCancel: () => {}
}

export default Cancel