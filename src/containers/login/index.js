import { useState, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/login-form';

function LoginContainer() {
  const store = useStore();
  const navigate = useNavigate();
  const auth = useSelector(s => s.auth);

  const [form, setForm] = useState({ login: '', password: '' });

  const handleInputChange = (value, name) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (auth.token && auth.user) {
      navigate('/profile');
    }
  }, [auth.token, auth.user, navigate]);

  useEffect(() => {
    store.actions.auth.clearError();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();

    const success = await store.actions.auth.login(form.login, form.password);

    if (success) {
      await store.actions.auth.fetchProfile();
      navigate('/profile');
    }
  };

  return (
    <LoginForm form={form} handleInputChange={handleInputChange} auth={auth} onSubmit={onSubmit} />
  );
}

export default LoginContainer;
