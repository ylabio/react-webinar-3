import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Button from "../button";

function Head({ title, btn }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className="Close-modal">
        {btn !== undefined ? <Button title={btn.title} callback={btn.callback} /> : ''}
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  btn: PropTypes.object
};

export default React.memo(Head);
