import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props){
  return (
    <div className={props.modalMargin ? 'Head-margin' : 'Head'}>
      <h1 className="Head-title">{props.title}</h1>
      {props.children}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
