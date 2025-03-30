import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalWindow({ children, onModalStateChange = () => {} }) {
  return (
    <div className="ModalWindow-backdrop">
      <div className="ModalWindow">
        <button 
          className="ModalWindow-close" 
          onClick={() => onModalStateChange()}
        />
        {children}
      </div>
    </div>
  );
}

ModalWindow.propTypes = {
  children: PropTypes.node,
  onModalStateChange: PropTypes.func,
};

export default React.memo(ModalWindow);
