import { memo, useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Input from "../input";
import { Navigate, useLocation } from "react-router-dom";

function LoginForm(props) {
  const cn = bem("loginForm");
  /*
  const store = useStore();

  const select = useSelector(state => ({
    auth: state.user.auth,
    error: state.user.error,
  })); */

  /*   const [login, setLogin] = useState('');
  const [password, setPassword] = useState(''); */
  /* if(props.auth){
    return
  } */
  const callbacks = {
    loginOnChange: useCallback((log) => {
      props.setLogin(log);
    }, []),
    passwordOnChange: useCallback((pass) => {
      props.setPassword(pass);
    }, []),
    onSubmit: useCallback(
      (log, pass) => {
        props.onSubmit(log, pass);
      },
      [props.signin]
    ),
  };

  return (
    <div className={cn()}>
      {props.auth && <Navigate to="/profile"/>}
      <p className={cn("title")}>{props.t("login.title")}</p>
      <div className={cn("container")}>
        <p className={cn("text")}>{props.t("login.input.label")}</p>
        <Input
          type="text"
          theme={"form"}
          value={props.login}
          onChange={callbacks.loginOnChange}
        />
        <p className={cn("text")}>{props.t("login.password.label")}</p>
        <Input
          type="password"
          theme={"form"}
          value={props.password}
          onChange={callbacks.passwordOnChange}
        />
        {props.error && (
          <p className={cn("text", { error: true })}>{props.error.message}</p>
        )}
      </div>
      <button onClick={() => callbacks.onSubmit(props.login, props.password)}>
        {props.t("login.button")}
      </button>
    </div>
  );
}

export default LoginForm;
