import React, {memo} from 'react';
import './style.css';

const PreHead = ({ children }) => {
  // const childrenArray = React.Children.toArray(children);
  return (
    <div className="Pre-head">
      <div className="Pre-head-container">
        {/*{childrenArray.map((item, index) =>*/}
          <div className="Pre-head-place">{children}</div>
        {/*)}*/}
      </div>
    </div>
  );
};

export default memo(PreHead);
