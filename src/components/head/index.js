import PropTypes from "prop-types";
import './style.css';
import {memo} from "react";

function Head({title, style}){
  return (
    <div className='Head' style={style}>
      <h1>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
};

export default memo(Head);
