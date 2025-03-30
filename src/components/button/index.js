import React from 'react';

import PropTypes from 'prop-types';

import './style.css';

function Button({ children, ...props }) {
  const callbacks = {
    onClick: () => {
      if (props.isListButton) {
        props.onClickButton(props.itemCode);
      } else {
        props.onClickButton();
      }
    },
  };

  return (
    <button onClick={callbacks.onClick} className={props.className ? props.className : null}>
      {children}
    </button>
  );
}

export default React.memo(Button);

Button.propTypes = {
  children: PropTypes.node,
  itemCode: PropTypes.number,
  isListButton: PropTypes.bool,
  onClickButton: PropTypes.func,
};
