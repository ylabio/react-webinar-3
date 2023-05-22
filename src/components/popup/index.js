import React from "react";
import PropTypes from 'prop-types';
import Head from "../head";
import Button from "../button";
import List from '../list'
import './style.css';

function Popup({
  isOpen,
  onPopupToggle,
  children
}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup__header">
          <Head title='Корзина'>
            <Button buttonText="Закрыть" onClick={onPopupToggle} />
          </Head>
        </div>
        {children}
      </div>
    </div>
  )
}

Popup.propTypes = {
  isOpen: PropTypes.bool,
  onPopupToggle: PropTypes.func
};

Popup.defaultProps = {
  isOpen: false,
  onPopupToggle: () => { }
}

export default React.memo(Popup);