import {memo} from "react";
import PropTypes from "prop-types";

function ListProducts({children}) {

  return (
    <>
      {children}
    </>
  );
}

ListProducts.propTypes = {
  children: PropTypes.node
}

export default memo(ListProducts);