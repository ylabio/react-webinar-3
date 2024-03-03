import React from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';

function Head({title, modal, handleClickOpenModal}) {
  const bemEntity = modal ? 'Head-modal' : 'Head'
  const cn = bem(bemEntity)

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      {modal &&
        <button className='Head-modal-btn-close' onClick={handleClickOpenModal}>Закрыть</button>
      }
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  modal: PropTypes.bool,
  handleClickOpenModal: PropTypes.func
};

export default React.memo(Head);
