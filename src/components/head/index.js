import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, topContent, children}) {
  return (
    <div className='Head'>
      {topContent ? <div className="Head-top">
                        {topContent}
                    </div> : ""}
      <div className="Head-bottom">
        <div className='Head-place'>
          <h1>{title}</h1>
        </div>
        <div className='Head-place'>{children}</div>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
