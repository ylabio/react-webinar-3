import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title,children}) {
  return (
    <div className='Head'>
      <h1 data-lang = "lang">{title}</h1>
      {children}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
