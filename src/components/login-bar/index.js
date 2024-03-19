import { memo } from "react";
import "./style.css";

function LoginBar({ isLogin, children }) {
  return <div className="LoginBar">{children}</div>;
}

export default memo(LoginBar);
