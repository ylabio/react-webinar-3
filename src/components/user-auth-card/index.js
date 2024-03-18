import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { useMemo, useState } from "react";
import useStore from "../../hooks/use-store";
const UserAuthCard = ({ onGetUser, eror }) => {
  const store = useStore();

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  const cn = bem("User");

  return (
    <div className={cn()}>
      <div className={cn() + "-Title"}>Вход</div>
      <div>
        <div>Логин</div>
        <input
          className={cn() + "-Input"}
          type="text"
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div>
        <div>Пароль</div>
        <input
          className={cn() + "-Input"}
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {eror && <div className={cn() + "-Eror"}>{eror}</div>}
      <button onClick={() => onGetUser(login, password)}>Войти</button>
    </div>
  );
};

export default UserAuthCard;
