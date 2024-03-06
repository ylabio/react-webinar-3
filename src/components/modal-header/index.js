import React from 'react'
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import "./style.css"

function ModalHeader(props) {
  const cn = bem(props.className)
  return (
    <div className={cn()}>
            <h1>{props.modalTitle}</h1>
          <button className={cn("close-button")} onClick={props.onClose}>
            Закрыть
          </button>
    </div>
  )
}

ModalHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalTitle : PropTypes.string.isRequired,
  className : PropTypes.string.isRequired
};

export default ModalHeader