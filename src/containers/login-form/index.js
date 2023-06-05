import React, { memo } from "react";
import Form from "../../components/form-layout";
import Text from "../../components/text";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

const LoginForm = () => {
  const store = useStore();
  const { t } = useTranslate();

  const { errorMessage } = useSelector((state) => ({
    errorMessage: state.login.errorMessage,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const [loginEl, passwordEl] = e.target;
    const fields = {
      login: loginEl.value,
      password: passwordEl.value,
    };
    store.actions.login.signIn(fields);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>{t("login.enter")}</h3>
      <label>
        {t("login.loginLabel")} <input />
      </label>
      <label>
        {t("login.passwordLabel")} <input />
      </label>
      {errorMessage && <Text type={"error"}>{t(errorMessage)}</Text>}
      <button type="submit">{t("login.loginBtn")}</button>
    </Form>
  );
};

export default memo(LoginForm);