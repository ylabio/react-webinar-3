import React from 'react'
import PropTypes from 'prop-types';
import './style.css';

function HeaderContent({children}) {
  return (
    <div className='HeaderContent'>
        {children}
    </div>
  )
}

HeaderContent.propTypes = {
  children: PropTypes.node
}

export default React.memo(HeaderContent)