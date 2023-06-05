import React, {memo, useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import AdditionalMessage from "../../components/additional-message";
import FormLayout from "../../components/form-layout";

const LoginForm = () => {

  const store = useStore();

  const {t} = useTranslate();

  const {errorMessage} = useSelector((state) => ({
    errorMessage: state.login.errorMessage,
  }));

  const callbacks = {
    // Отправка формы
    handleSubmit: useCallback(async(e) => {
      e.preventDefault();
      const [loginContent, passwordContent] = e.target;
      const data = {
        login: loginContent.value,
        password: passwordContent.value,
      };
      await store.actions.login.signIn(data);
    }, [store])
  };

  return (
    <FormLayout onSubmit={callbacks.handleSubmit}>
      <h2>{t('login.enter')}</h2>
      <label>
        {t('login.loginLabel')}
        <input />
      </label>
      <label>
        {t('login.passwordLabel')}
        <input type='password' />
      </label>
      {errorMessage && <AdditionalMessage type='error'>{t(errorMessage)}</AdditionalMessage>}
      <button type='submit'>{t('login.loginBtn')}</button>
    </FormLayout>
  );
};

export default memo(LoginForm);