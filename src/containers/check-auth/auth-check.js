import React from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

const AuthCheck = ({ children }) => {
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  const location = useLocation();
  const { pathname } = location;

  if (!token) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  return children;
};

export default AuthCheck;
