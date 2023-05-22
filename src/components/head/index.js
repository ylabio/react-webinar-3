import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Head({title, isButtonVisible, buttonText, onClick}){
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      {isButtonVisible && <button type="submit" onClick={onClick}>{buttonText}</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
  isButtonVisible: PropTypes.bool,
  buttonText: PropTypes.string,
  onClick: PropTypes.func
};

Head.defaultProps = {
  isButtonVisible: false,
  buttonText: "",
  onClick: PropTypes.func
};

export default React.memo(Head);
