import React from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

const LoginCheck = ({ children }) => {
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (!token) {
    return children;
  }

  return <Navigate to={from} />;
};

export default LoginCheck;
