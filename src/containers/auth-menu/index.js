import React, {memo, useCallback} from "react";
import {Link} from "react-router-dom";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

const AuthMenu = () => {

  const store = useStore();

  const {t} = useTranslate();

  const user = useSelector((state) => state.auth.user);

  const callbacks = {
    // Выход из аккаунта
    handleLogout: useCallback(() => store.actions.login.signOut(), [store]),
  };

  return (
    <SideLayout side='end' padding='medium' gap='medium'>
      {user && <Link to={'/profile'}>{user.profile.name}</Link>}
      {user ? (
        <button onClick={callbacks.handleLogout}>{t('login.exit')}</button>
      ) : (
        <Link to={'/login'}>
          <button>{t('login.enter')}</button>
        </Link>
      )}
    </SideLayout>
  );
};

export default memo(AuthMenu);