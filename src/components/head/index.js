import React, {useCallback} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, isModal, onClose}) {
  const handleButtonClose = () => {
    onClose();
  }

  return (
    <div className={'Head' + (isModal ? ' Head_modal' : '')}>
      <h1>{title}</h1>
      {isModal && <div className='Head-button'>
        <button onClick={handleButtonClose}>Закрыть</button>
      </div>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  isModal: PropTypes.bool,
  onClose: PropTypes.func,
};

export default React.memo(Head);
