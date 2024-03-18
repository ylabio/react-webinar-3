import { memo } from "react";
import PropTypes from "prop-types";
import './style.css';

function HeadProfile({children, title, onClick}) {
  return (
    <div className='HeadProfile'>
      {children}
      <button onClick={onClick}>{title}</button>
    </div>
  )
}

HeadProfile.PropTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClick: PropTypes.func
}

HeadProfile.defaultProps = {
  onClick: () => {},
}

export default memo(HeadProfile);
