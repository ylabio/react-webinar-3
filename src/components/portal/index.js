import React from 'react';
import {createPortal} from 'react-dom';
import PropTypes from "prop-types";

function Portal({children}) {
  return createPortal(<>{children}</>, document.body);
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Portal;
