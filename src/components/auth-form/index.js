import React, { useState } from "react";
import { cn as bem } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import useInit from "../../hooks/use-init";
import "./style.css";

const AuthForm = ({signIn, user, err}) => {

  const cn = bem("Form");
  const navigate = useNavigate()
  const [valueLog, setValueLog] = useState("");
  const [valuePass, setValuePass] = useState("");

  useInit(() => {
    if (user) {
      navigate(`/user/${user.profile.name}`)
    }
  }, [user], true)

 const callbacks = {
  submit: (e, valueLog, valuePass) => {
    e.preventDefault();
    signIn(valueLog, valuePass)
    setValueLog('')
    setValuePass('')
  }
 }

  return (
    <form className={cn()} onSubmit={(e) => callbacks.submit(e, valueLog, valuePass)}>
      <h2 className={cn("title")}>Вход</h2>
      <div className={cn("field")}>
        <span className={cn("label")}>Логин</span>
        <input
          className={cn("input")}
          type="text"
          value={valueLog}
          onChange={(e) => setValueLog(e.target.value)}
        ></input>
      </div>
      <div className={cn("field")}>
        <span className={cn("label")}>Пароль</span>
        <input
          className={cn("input")}
          type="password"
          value={valuePass}
          onChange={(e) => setValuePass(e.target.value)}
        ></input>
      </div>
      {err !== null && (<div className={cn("err")}>Ошибка: {err}</div> )}
      <button className={cn("btn")} type='submit'>Войти</button>
    </form>
  );
};

AuthForm.propTypes = {
  signIn: PropTypes.func.isRequired,
  user: PropTypes.object,
  err: PropTypes.object,
};

AuthForm.defaultProps = {
  signIn: () => {},
  user: null,
  err: null,
}
export default AuthForm;
