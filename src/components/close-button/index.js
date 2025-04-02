import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../icons/close-icon';
import './style.css';

function CloseButton({ onTogglePopupFlag = () => {} }) {

  return (
      <button className={'Close-button'} onClick={onTogglePopupFlag}>
        <CloseIcon/>
      </button>
  );
}

CloseButton.propTypes = {
  onTogglePopupFlag: PropTypes.func,
};

export default React.memo(CloseButton);
