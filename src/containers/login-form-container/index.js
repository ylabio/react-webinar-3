import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import { useUser } from '../../hooks/use-user';
import LoginForm from '../../components/login-form';

function LoginFormContainer() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { loginUser, loading, error } = useUser();

  const handleSubmit = async (login, password) => {
    try {
      await loginUser(login, password);
      navigate('/');
      window.location.reload();
    } catch {

    }
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      loading={loading}
      errorText={error}
      headingText={t('login.heading')}
      loginLabel={t('login.label')}
      passwordLabel={t('login.password.label')}
      submitText={t('login.form.btn')}
      submittingText={t('login.btn')}
    />
  );
}

export default LoginFormContainer;
