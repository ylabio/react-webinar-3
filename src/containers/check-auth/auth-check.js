import React from "react";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

const AuthCheck = ({ children }) => {
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthCheck;
