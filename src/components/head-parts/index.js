import {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function HeadParts({children}) {
  return (
    <div className="HeadParts">
      {children}
    </div>
  )
}

HeadParts.propTypes = {
  children: PropTypes.node,
}

export default memo(HeadParts);