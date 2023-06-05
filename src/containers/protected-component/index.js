import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedComponent = ({ isAuth, children, unauthUrl = "/" }) => {
  if (!isAuth) return <Navigate to={unauthUrl} />;

  return <>{children}</>;
};

export default ProtectedComponent;