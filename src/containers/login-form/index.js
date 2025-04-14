import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import LoginForm from '../../components/login-form';

function LoginFormContainer() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      setErrors([]);
      setIsSubmitting(true);

      try {
        const formData = new FormData(event.target);
        const credentials = Object.fromEntries(formData.entries());
        const success = await store.actions.auth.login(credentials);

        await new Promise(resolve => setTimeout(resolve, 50));
        if (success) {
          navigate('/profile');
        }
      } catch (error) {
        try {
          const errorMessage = error.message;
          const jsonString = errorMessage.startsWith('Error: ')
            ? errorMessage.replace('Error: ', '')
            : errorMessage;
          const errorData = JSON.parse(jsonString);
          setErrors(errorData.issues || ['Ошибка авторизации']);
        } catch (parseError) {
          setErrors(['Ошибка авторизации']);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [store, navigate],
  );

  return (
    <LoginForm
      buttonMessage={t('login.button')}
      header={t('login.enter')}
      loginLabel={t('login.login')}
      loginPlaceholder={t('login.text')}
      passwordLabel={t('login.password')}
      passwordPlaceholder={t('password.text')}
      onSubmit={handleSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
}

export default memo(LoginFormContainer);
