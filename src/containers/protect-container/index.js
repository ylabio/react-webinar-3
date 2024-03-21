import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectContainer({ isAuth, path }) {
  return !isAuth ? <Navigate to={path} replace /> : <Outlet />;
}

export default memo(ProtectContainer);
