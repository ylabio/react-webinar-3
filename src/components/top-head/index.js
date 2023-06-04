import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function TopHead({children}){
  return (
    <div className='Head'>
      <div className='Head-place'>{children}</div>
    </div>
  )
}

TopHead.propTypes = {
  children: PropTypes.node,
};

export default memo(TopHead);