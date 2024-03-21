import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Head from "../../components/head";
import LoginForm from "../../components/login-form";
import PageLayout from "../../components/page-layout";
import AuthControl from "../../containers/auth-control";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

/**
 * Главная страница - первичная загрузка каталога
 */
function Login() {
  const [data, setData] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState("");
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    token: state.session.token,
    waiting: state.session.waiting,
    error: state.session.error,
  }));

  const callbacks = {
    onChange: useCallback(
      (e) => setData({ ...data, [e.target.name]: e.target.value }),
      [data, setData]
    ),
    onSubmit: useCallback(async (e) => {
      e.preventDefault();
      store.actions.session.login(data.login, data.password);
      setData({ login: "", password: "" });
    }),
  };

  useEffect(() => {
    if (select.token) navigate("/profile");

    return () => {
      store.actions.session.resetError();
    };
  }, [select.token, navigate]);

  return (
    <PageLayout>
      <AuthControl />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        data={data}
        error={select.error}
        onChange={callbacks.onChange}
        onSubmit={callbacks.onSubmit}
        t={t}
      />
    </PageLayout>
  );
}

export default memo(Login);
