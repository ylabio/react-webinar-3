import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function ScrollBar({children,show,heightListToList,refScroll}) {

  return (
        <div ref={refScroll}
             style={(heightListToList ? {height: heightListToList} : {})}
             className={`scroll-container ${show ? "show" : ""} `}>
          {children}
        </div>
  );
}

ScrollBar.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  heightListToList: PropTypes.number,
  refScroll: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.any })
])
}

ScrollBar.defaultProps = {};

export default memo(ScrollBar);
