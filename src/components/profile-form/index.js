import { memo, useCallback } from "react";
import useSelector from "../../hooks/use-selector";
import "./style.css";

function ProfileForm(props) {

  const select = useSelector((state) => ({
    user: state.users.user,
    userName: state.users.userName,
    params: state.users.params,
  }));

  return (
    <div className="Profile-Form">
      {select.user == null || Object.keys(select.user)[0] == "error" ? (
        <>
          <div className="Login-Title">Вход</div>
          <label for="Input-Login">Логин</label>
          <input
            value={select.params.login}
            onChange={(e) => {
              props.setLogin(e.target.value);
            }}
            id="Input-Login"
          />
          <label for="Input-Password">Пароль</label>
          <input
            value={select.params.password}
            onChange={(e) => {
              props.setPassword(e.target.value);
            }}
            id="Input-Password"
          />
          {select.user != null && Object.keys(select.user)[0] == "error" && (
            <div class="Login-Error">
              {select.user.error.data.issues[0].message}
            </div>
          )}
          <button onClick={props.getInfo}>Войти</button>
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

export default memo(ProfileForm);
