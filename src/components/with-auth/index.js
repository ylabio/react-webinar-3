import { memo } from "react";
import { Navigate } from "react-router-dom";

function WithAuth({ children }) {
  const token = localStorage.getItem("token");

  return <>{token ? children : <Navigate to="/login" />}</>;
}

export default memo(WithAuth);
