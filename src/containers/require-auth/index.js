import React, { memo, useState } from "react";
import useAuth from "../../hooks/use-auth";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../../components/spinner";

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user.isLoading)
    return <Spinner active={user.isLoading}>{children}</Spinner>;
  if (!user.data) return <Navigate to="/login" state={{ from: location }} />;
  if (user.data) return children;
}

export default memo(RequireAuth);
