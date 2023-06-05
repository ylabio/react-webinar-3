import { useNavigate } from "react-router";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import { Link } from "react-router-dom";
import useStore from "../../hooks/use-store";
import { useCallback } from "react";

function UserBar() {
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    isLogin: state.authorization.isLogin,
    username: state.authorization.user.name,
  }));

  const callback = {
    logout: useCallback(() => store.actions.authorization.logout(), [store]),
  };

  if (select.isLogin === false) {
    return (
      <SideLayout padding="small" side="end">
        <button onClick={() => navigate("/login")}>Вход</button>
      </SideLayout>
    );
  }

  return (
    <SideLayout padding="small" side="end">
      <Link to={"/profile"}>{select.username}</Link>
      <button onClick={callback.logout}>Выход</button>
    </SideLayout>
  );
}

export default UserBar;
