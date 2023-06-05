import { memo, useCallback, useEffect, useState } from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Form from "../../components/form";

function LoginForm() {

  const store = useStore();

  useInit(() => {
    store.actions.login.resetError();
  });

  const select = useSelector(state => ({
    error: state.login.error,
  }));

  const callbacks = {
    login: useCallback((login, password) => store.actions.login.login(login, password), [store]),
  }

  const { t } = useTranslate();

  return (
    <Form login={callbacks.login} title={t('login.title')} loginText={t('login.login')}
      password={t('login.password')} buttonName={t('login.button')} error={select.error} />
  );
}

export default memo(LoginForm);
