import React from "react";
import PropTypes from "prop-types";
import './style.css';

function PopupLayout(props) {

  return (
    <div className='PopupLayout'>
      <div className={`PopupLayout-overlay ${props.isPopupOpened ? 'PopupLayout-opened' : ''}`}>
        <div className='PopupLayout-container'>
          <div className='PopupLayout-header'>
            <h2 className='PopupLayout-title'>{props.title}</h2>
            <button onClick={props.onClose} className='PopupLayout-btn' type="button">Закрыть</button>
          </div>
          <div className='PopupLayout-list'>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

PopupLayout.propTypes = {
  children: PropTypes.node
}

export default React.memo(PopupLayout);