import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function Row({ children }) {
  return (
    <div className='Row'>{children}</div>
  )
}

Row.propTypes = {
  onAdd: PropTypes.node
};

export default memo(Row);
