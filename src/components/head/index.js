import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props) {
  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      <div className='Head-children'>{props.children}</div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.children
};

export default memo(Head);
