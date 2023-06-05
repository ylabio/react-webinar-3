import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import LoginTool from "../../components/login-tool";

function LoginPanel() {
  const store = useStore();

  useInit(() => {
    store.actions.profile.getUser();
  }, []);

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    user: state.profile.data,
    waiting: state.login.waiting
  }));

  const callbacks = {
    logout: useCallback(() => store.actions.login.logout(), [store]),
  }

  const { t } = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <LoginTool isAuth={select.isAuth} userName={select.user?.profile?.name}
        logout={callbacks.logout} logoutText={t('logout')} loginText={t('login')} />
    </Spinner>
  );
}

export default memo(LoginPanel);
