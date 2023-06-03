import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import LoginButton from "../../components/login-button";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Head from "../../components/head";
import LoginCard from "../../components/login-card";

function Login() {
  const store = useStore();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslate();

  // Обработчик отправки формы авторизации
  async function onSubmitForm(e) {
    e.preventDefault();
    await store.actions.user.signIn({ login, password });
  }

  const userState = useSelector((state) => state.user);
  const { isAuthenticated, token, error } = userState;

  // Если авторизация прошла успешно, сохраняем токен в localStorage и перенаправляем на страницу профиля
  if (isAuthenticated) {
    localStorage.clear();
    localStorage.setItem("token", JSON.stringify(token));

    // перенаправление на страницу пользователя
    return <Navigate replace to="/profile" />;
  }

  const onLoginChange = (e) => setLogin(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  return (
    <PageLayout>
      <LoginButton />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginCard
        onLoginChange={onLoginChange}
        onPasswordChange={onPasswordChange}
        onSubmitForm={onSubmitForm}
        login={login}
        password={password}
        isAuthenticated={isAuthenticated}
        error={error}
      />
    </PageLayout>
  );
}

export default Login;
