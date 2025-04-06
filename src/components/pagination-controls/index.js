import {memo} from 'react';
import './style.css';
import PropTypes from 'prop-types';

function PaginationControls({children}) {

  return (
    <div className="PaginationControls">
      {children}
    </div>
  );
}


PaginationControls.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(PaginationControls);
