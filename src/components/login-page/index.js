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
    setPassword: useCallback(
      (value) => store.actions.users.setPassword(value),
      [store]
    ),
    setLogin: useCallback((value) => store.actions.users.setLogin(value), [
      store,
    ]),
  };
  console.log(select.user);
  return (
    <div className="Login-Page">
      {select.user == null || Object.keys(select.user)[0] == "error" ? (
        <>
          <div className="Login-Title">Вход</div>
          <label for="Input-Login">Логин</label>
          <input
            value={select.params.login}
            onChange={(e) => {
              callbacks.setLogin(e.target.value);
            }}
            id="Input-Login"
          />
          <label for="Input-Password">Пароль</label>
          <input
            value={select.params.password}
            onChange={(e) => {
              callbacks.setPassword(e.target.value);
            }}
            id="Input-Password"
          />
          {select.user != null && Object.keys(select.user)[0] == "error" && (
            <div class="Login-Error">
              {select.user.error.data.issues[0].message}
            </div>
          )}
          <button onClick={callbacks.getInfo}>Войти</button>
        </>
      ) : (
        <div className="User-Page">
          <div className="Login-Title">Профиль</div>
          <div className="User-Info">Имя: <div className="User-Data">{select.user.result.user.profile.name}</div></div>
          <div className="User-Info">Телефон: <div className="User-Data">{select.user.result.user.profile.phone}</div></div>
          <div className="User-Info">email: <div className="User-Data">{select.user.result.user.email}</div></div>
        </div>
      )}
    </div>
  );
}

export default memo(LoginPage);
