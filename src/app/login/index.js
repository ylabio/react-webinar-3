import {memo, useCallback, useEffect, useState} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../layouts/page-layout";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LoginForm from "../../components/login-form";
import Header from "../../containers/header";
import {useNavigate} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

function Login() {
  const store = useStore();
  const {t} = useTranslate();
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  const select = useSelector(state => ({
    userName: state.session.userInfo.name,
    waiting: state.session.waiting,
    loggedIn: state.session.loggedIn,
    message: state.user.error,
  }));

  const callbacks = {
    // Отправка логин-формы на сервер
    onSendForm: useCallback(userData => {store.actions.user.login(userData), [store]}),
  };

  useEffect(() => {
    if (token && select.loggedIn) {
      navigate("/profile")
    }
    store.actions.user.resetErrors();
  }, [token, select.loggedIn])

  return (
    <PageLayout>
      <Header title={t("title")} />
      <Navigation />
      {/* <Spinner active={select.waiting}> */}
        <LoginForm onSendForm={callbacks.onSendForm} errorMessage={select.message} t={t} />
      {/* </Spinner> */}
    </PageLayout>
  );
}

export default memo(Login);
