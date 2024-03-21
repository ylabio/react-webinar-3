import React, { memo, useCallback, useEffect, useState } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import InputModule from "../../components/input-module";
import PageLayout from "../../components/page-layout";
import ButtonLogin from "../../components/button-login";

function Login() {
  const store = useStore();
  const initialValues = { login: "", password: "" };
  const [formData, setFormData] = useState(initialValues);
  const select = useSelector((state) => ({
    waiting: state.auth.waiting,
    user: state.auth.user,
    error: state.auth?.error,
  }));

  const navigate = useNavigate();
  useEffect(() => {
    if (!select.waiting && select.user) {
      setFormData(initialValues);
      navigate("/profile-page");
    }
  }, [select.user, select.waiting, initialValues, navigate]);

  

  const { t } = useTranslate();

  const callbacks = {
    onLoginFormChange: useCallback(
      (fieldName, value) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [fieldName]: value,
        }));
      },
      [setFormData]
    ),

    onLoginFormSubmit: useCallback(
      (e) => {
        e.preventDefault();
        store.actions.auth.handleLogin(formData);
      },
      [store, formData]
    ),
    onLogout: useCallback(() => {
      store.actions.auth.handleLogout(); // Предположим, что здесь вызывается обработчик выхода из системы
    }, [store.actions.auth])
  };

  

  return (
    <PageLayout>
      <ButtonLogin profilePath={"/profile-page"} title="войти" onLogin={callbacks.onLoginFormSubmit}/>
      <Head title={t("title")} />
      <Navigation />
      <InputModule
       error={select.error || null}
        form={{
          login: formData.login || "",
          password: formData.password || "",
        }}
        onSubmit={callbacks.onLoginFormSubmit}
        onChange={callbacks.onLoginFormChange}
      />
    </PageLayout>
  );
}

export default memo(Login);
