import {memo} from "react";
import PropTypes from "prop-types";
import "./style.css";


function Overlay(props) {
  return (
    <div className={"Overlay"} onClick={props.onClick} />
  )
}

export default memo(Overlay);

Overlay.propTypes = {
  onClick: PropTypes.func
}

Overlay.propTypes = {
  onClick: () => {}
}