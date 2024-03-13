import React from 'react'
import PropTypes from 'prop-types';

function SpaceBetween({children}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
        {children}
    </div>
  )
}

SpaceBetween.propTypes = {
    children: PropTypes.node.isRequired
  };

export default SpaceBetween