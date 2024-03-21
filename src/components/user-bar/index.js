import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import LogoutUserButton from "../user-buttons/logout-button";
import LoginUserButton from "../user-buttons/login-button";

/**
 * Контейнер с компонентами навигации
 */
function UserBar(props) {
  const store = useStore();

  const userName = useSelector(state => state.auth.user?.profile?.name);

  const callbacks = {
    login: useCallback(body => store.actions.auth.login(body), [store]),
    logOut: useCallback(() => store.actions.auth.logOut(), [store]),
  }

  return (
    <SideLayout side='end'>
      {userName ? <LogoutUserButton userName={userName} logOut={callbacks.logOut} /> :
        <LoginUserButton />
      }
    </SideLayout>
  );
}

export default memo(UserBar);
