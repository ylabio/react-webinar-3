import { memo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import SideLayout from "../../components/side-layout";
import UserName from "../../components/user-name";

function TopMenu({ }) {

  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    user: state.login.user,
    status: state.login.status
  }));

  const callbacks = {
    onSignIn: useCallback(() => {
      navigate('/login', { state: { come_back: location.pathname } })
    }, []),
    onSignOut: useCallback(() => {
      store.actions.login.signOut();
    }, [])
  }

  return (
    <SideLayout side="end" padding="small-with-medium">
      {select.status ? <UserName link="/profile" name={select.user?.profile.name} /> : ''}
      {select.status
        ? <button onClick={callbacks.onSignOut}>Выход</button>
        : <button onClick={callbacks.onSignIn}>Вход</button>}
    </SideLayout>
  )
}

export default memo(TopMenu);