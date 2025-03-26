import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { createPortal } from 'react-dom';

function Popup({ children, headerTitle = 'Корзина', isOpen = false, onClose }) {
  const callbacks = {
    onClick: () => {
      onClose();
    },
  };

  return (
    <>
      {isOpen &&
        createPortal(
          <div className="popup">
            <div className="wrapper">
              <div className="inner">
                <div className="content">
                  <header className="header">
                    <h2 className="popup__title">{headerTitle}</h2>
                    <div className="close">
                      <button onClick={callbacks.onClick}></button>
                    </div>
                  </header>
                  <div className="body">{children}</div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

Popup.propTypes = {
  headerTitle: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default React.memo(Popup);
