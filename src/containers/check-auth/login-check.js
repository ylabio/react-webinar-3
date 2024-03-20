import React from "react";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

const LoginCheck = ({ children }) => {
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  if (!token) {
    return children;
  }

  return <Navigate to="/profile" />;
};

export default LoginCheck;
