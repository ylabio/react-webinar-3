import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Button({ onClick = () => { }, buttonType }) {

  let buttonText = "";
  let buttonClass = "";

  if (buttonType == "addItemToCart") {
    buttonText = "Добавить";
    buttonClass = "Button-add";
  }
  else if (buttonType == "removeItemFromCart") {
    buttonText = "Удалить";
    buttonClass = "Button-remove";
  }

  const classes = [
    buttonClass,
    'button',
  ].join(" ");

  return (
    <button onClick={onClick} className={classes}>{buttonText}</button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  props: PropTypes.array,
};

export default React.memo(Button);
