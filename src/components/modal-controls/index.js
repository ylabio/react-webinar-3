import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import closeIcon from './close-icon.svg';

function ModalControls({ onCloseCart = () => {} }) {
  return (
    <div className="ModalControls">
      <button className="CartBtn-close" onClick={() => onCloseCart()}>
        <img src={closeIcon} alt="close" />
      </button>  
    </div>
  );
};

ModalControls.propTypes = {
  onCloseCart: PropTypes.func,
};

export default React.memo(ModalControls);