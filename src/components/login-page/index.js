import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import './style.css';

function LoginPage() {
  const store = useStore();

  const callbacks = {
    // Удаление из корзины
    getInfo: useCallback(() => store.actions.users.getInfo(), [store]),
  };


  return (
    <div className="Login-Page">
      <div className="Login-Title">
        Вход
      </div>
      <label for="Input-Login">Логин</label>
      <input id="Input-Login"/>
      <label for="Input-Password">Пароль</label>
      <input id="Input-Password"/>
      <button onClick={callbacks.getInfo}>Войти</button>
    </div>
  );
}

export default memo(LoginPage);
