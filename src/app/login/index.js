import React, { memo } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import AuthLayout from "../../components/auth-layout";
import Form from "../../components/form";
import useForm from "../../hooks/use-form";
import Field from "../../components/field";
import useAuth from "../../hooks/use-auth";
import UserAuthPortal from "../../containers/user-auth-portal";
import Spinner from "../../components/spinner";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [values, handleChange, resetForm] = useForm({
    login: "",
    password: "",
  });
  const { t } = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();
  const fromPage = location.state?.from?.pathname || "/";
  const { signIn, user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ ...values }, () => {
      navigate(fromPage, { replace: true });
    });
    resetForm();
  };

  if (user.data) return <Navigate to={fromPage} />;

  return (
    <PageLayout>
      <UserAuthPortal />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />

      <Spinner active={user.waiting}>
        <AuthLayout title={t("login.title")}>
          <Form
            handleSubmit={handleSubmit}
            titleBtn={t("button.signIn")}
            error={user.error}
          >
            <Field
              name={"login"}
              value={values.login}
              placeholder={t("field.login")}
              onChange={handleChange}
              type={"text"}
            />
            <Field
              name={"password"}
              value={values.password}
              placeholder={t("field.password")}
              onChange={handleChange}
              autoComplete={"on"}
              type="password"
            />
          </Form>
        </AuthLayout>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
