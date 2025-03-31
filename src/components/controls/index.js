import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ align = 'left', children }) {

  const alignStyle = {
    left: 'align-left',
    center: 'align-center',
    right: 'align-right'
  }[align]

  return (
    <div className={`Controls ${alignStyle}`}>
      {children}
    </div >
  )
}

Controls.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node,
};

export default React.memo(Controls);
