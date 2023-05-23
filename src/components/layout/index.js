import React from "react";
import PropTypes from "prop-types";

import './style.css';

function Layout({children}) {

  return (
    <div className="Layout">
      
      {children}
      <div className="Layout-overlay"></div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node
}

export default React.memo(Layout);