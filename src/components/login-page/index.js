import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import "./style.css";

function LoginPage() {
  const store = useStore();

  const select = useSelector((state) => ({
    user: state.users.user,
    params: state.users.params,
  }));

  const callbacks = {
    // Удаление из корзины
    getInfo: useCallback(() => store.actions.users.getInfo(), [store]),
  };
  console.log(select.user);
  return (
    <div className="Login-Page">
      {(select.user == null ||
        Object.keys(select.user) != ["error"]) && (
        <>
          <div className="Login-Title">Вход</div>
          <label for="Input-Login">Логин</label>
          <input id="Input-Login" />
          <label for="Input-Password">Пароль</label>
          <input id="Input-Password" />
          {select.user != null && Object.keys(select.user)[0] == "error" && (
            <div>error</div>
          )}
          <button onClick={callbacks.getInfo}>Войти</button>
        </>
      )}
    </div>
  );
}

export default memo(LoginPage);
