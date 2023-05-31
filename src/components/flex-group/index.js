import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function FlexGroup({ children }) {
  
  return (
    <div className='Flex-container'>
      { children }
    </div>
  );
}

FlexGroup.propTypes = {
  children: PropTypes.node
};

export default memo(FlexGroup);
