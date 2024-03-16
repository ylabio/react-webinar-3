import { memo } from "react";
import "./style.css";

function LoginContainer({ children }) {
  return <div className="Login">{children}</div>;
}

export default memo(LoginContainer);
