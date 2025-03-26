import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls(props) {

  const callbacks = {
    onClick: () => {
      if (props.isListButton) {
        props.onButtonClick(props.itemCode);
      } else {
        props.onButtonClick();
      }
    },
  }
  return (
    <div className="Controls">
      <button onClick={() => callbacks.onClick()}><span>пусто</span></button>
    </div>
  );
}

Controls.propTypes = {
  title: PropTypes.string,
  onButtonClick: PropTypes.func,
  itemCode: PropTypes.number,
  isListButton: PropTypes.bool,
};

export default React.memo(Controls);
