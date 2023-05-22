import PropTypes from "prop-types";
import { createPortal } from "react-dom";

function Portal (props) {
  const { children, element } = props;

  return createPortal(children, element);
}

Portal.propTypes = {
  children: PropTypes.node
}

Portal.defaultProps = {
  element: document.body
}

export default Portal;
