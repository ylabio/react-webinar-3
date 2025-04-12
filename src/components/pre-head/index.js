import React, {memo} from 'react';
import './style.css';

const PreHead = ({ children = null }) => {
  // const childrenArray = React.Children.toArray(children);
  return (
    <div className="Pre-head">
      <div className="Pre-head-container">
        <div className="Pre-head-place">{children}</div>
      </div>
    </div>
  );
};

export default memo(PreHead);
