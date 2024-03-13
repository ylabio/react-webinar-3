import React, { memo } from "react";
import PropTypes from "prop-types";
import ErrorPage from "../page-error";

function LoadErrorComponent({ error, isLoading, children, loader }) {
  return (
    <>
      {error && <ErrorPage text={error} />}
      {isLoading && loader}
      {!error && !isLoading && children}
    </>
  );
}
LoadErrorComponent.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  loader: PropTypes.node,
  children: PropTypes.node.isRequired,
};

LoadErrorComponent.defaultProps = {
  error: "",
  loader: "loading...",
};

export default memo(LoadErrorComponent);
