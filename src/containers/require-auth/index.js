import React, { memo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function RequireAuth({ children }) {
  const location = useLocation();
  const select = useSelector((state) => ({
    user: state.user,
    authFetchCompleted: state.user.authFetchCompleted,
  }));

  if (!select.authFetchCompleted || select.user.data) return children;

  if (!select.user.data)
    return <Navigate to="/login" state={{ from: location.pathname }} />;
}

export default memo(RequireAuth);
