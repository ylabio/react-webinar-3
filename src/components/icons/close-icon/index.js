import * as React from "react";

import PropTypes from "prop-types";

const CloseIcon = (props) => (
  <svg {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      d="m9.88 8 5.733-5.72A1.34 1.34 0 0 0 13.72.387L8 6.12 2.28.387A1.339 1.339 0 0 0 .387 2.28L6.12 8 .387 13.72a1.333 1.333 0 0 0 0 1.893 1.333 1.333 0 0 0 1.893 0L8 9.88l5.72 5.733a1.335 1.335 0 0 0 1.893 0 1.335 1.335 0 0 0 0-1.893z"
    ></path>
  </svg>
);

CloseIcon.propTypes = {
  className: PropTypes.string,
}

export default CloseIcon;
