import { useNavigate, Navigate, useLocation } from "react-router-dom";
import "./style.css";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import { useCallback } from "react";
const HeaderAuth = () => {
  const navigate = useNavigate();
  const store = useStore();
  const select = useSelector((state) => ({
    auth: state.user.auth,
    user: state.user.user,
  }));

  const callbacks = {
    onDeleteUser: useCallback(() => store.actions.user.deleteUser(), [store]),
  };


  return (
    <div className="HeaderAuth">
      {select.auth && (
        <div
          className="HeaderAuth-Username"
          onClick={() => navigate("/profile")}
        >
          {select.user.profile.name}
        </div>
      )}
      {select.auth ? (
        <button onClick={() => callbacks.onDeleteUser()}>Выход</button>
      ) : (
        <button onClick={() => navigate("/login")}>Вход</button>
      )}
    </div>
  );
};

export default HeaderAuth;
