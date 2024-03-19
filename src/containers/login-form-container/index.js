import { memo } from "react";
import LoginForm from "../../components/login-form";

function LoginFormContainer() {
  return <LoginForm />;
}

export default memo(LoginFormContainer);
