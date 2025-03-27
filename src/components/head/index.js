import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import close from '../../assets/close.png';

function Head({ title, blockName = 'Head', showCloseButton = false, onClose = () => {} }) {
  const blockClass = `${blockName}`;
  const containerClass = `${blockName}-container`;
  const titleClass = `${blockName}-title`;

  return (
    <div className={blockClass}>
      <div className={containerClass}>
        <h1 className={titleClass}>{title}</h1>
        {showCloseButton && (
          <button className={`${blockName}-close-button`} onClick={onClose}>
            <img src={close} alt="close" />
          </button>
        )}
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
  blockName: PropTypes.string,
  showCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
};

export default React.memo(Head);
