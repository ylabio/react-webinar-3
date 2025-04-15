import { memo } from 'react';
import LoginForm from '../../components/login-form';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { useNavigate } from 'react-router-dom';

function LoginFormContainer() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();
  
  const select = useSelector(state => ({
    error: state.user.error,
    waiting: state.user.waiting
  }));

  const handleSubmit = async (login, password) => {
    const success = await store.actions.user.signIn(login, password);
    if (success) {
      await store.actions.user.load();
      navigate('/');
    }
  };

  return (
    <LoginForm
      t={t}
      error={select.error}
      waiting={select.waiting}
      onSubmit={handleSubmit}
    />
  );
}

export default memo(LoginFormContainer);