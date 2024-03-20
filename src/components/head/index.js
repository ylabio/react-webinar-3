import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LoginButtons from '../login-buttons';

function Head(props) {
  return (
    <div>
      <div className='Head'>
        <div className='Head-place'>
          <h1>{props.title}</h1>
        </div>
        <div className='Head-place'>{props.children}</div>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
