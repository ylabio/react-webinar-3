import React from 'react';
import PropTypes from 'prop-types';

function Actions({children, ...props}) {
  
    return  <div {...props}>
        {children}
    </div>
    
  }

  export default Actions

Actions.propTypes = {
    children: PropTypes.node,
    props: PropTypes.object
  };