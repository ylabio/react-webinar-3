import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function LoaderWrapper({ children, isLoading, loader }) {
  return (
    <>
      {isLoading ? (
        <>
          <div className="Loader-wrapper">{children}</div>
          {loader}
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

LoaderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loader: PropTypes.element.isRequired,
};

export default LoaderWrapper;
