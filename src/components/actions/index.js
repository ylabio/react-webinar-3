import React from "react";

import PropTypes from "prop-types";

function Actions({children, ...props}) {

  return <div {...props}>
    {children}
  </div>;

}

Actions.propTypes = {
  children: PropTypes.node,
  props: PropTypes.object
};

export default Actions;

