import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function TopHead({children}){
  return (
    <div className='TopHead'>
      <div className='TopHead-place'>{children}</div>
    </div>
  )
}

TopHead.propTypes = {
  children: PropTypes.node,
};

export default memo(TopHead);