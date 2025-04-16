import { memo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import Button from '../../components/button';
import Input from '../../components/input';
import './style.css';

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Устанавливаем локальное состояние
    const success = await store.actions.auth.signIn(login, password);
    setIsSubmitting(false); // Сбрасываем после завершения

    if (success) {
      navigate(from);
    }
  };

  const { t } = useTranslate();
  const cn = bem('LoginForm');
  const store = useStore();
  const { issues, waiting } = useSelector(state => state.auth);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  // Сбросить issues при открытии формы
  useEffect(() => {
    store.actions.auth.setState({
      ...store.getState().auth,
      issues: null,
    });
  }, []);

  return (
    <form onSubmit={handleSubmit} className={cn()} >
      <h2 className={cn("caption")}>{t('head.entry')}</h2>
      <label>
        <span>{t('loginForm.loginLabel')}</span>
        <Input value={login} onChange={setLogin} type="text" placeholder={t('loginForm.loginPlaceholder')} delay={1000}
          theme={'small'} />
      </label>
      <label>
        <span>{t('loginForm.passwordLabel')}</span>
        <Input value={password} onChange={setPassword} type="password" placeholder={t('loginForm.passwordPlaceholder')} delay={1000}
          theme={'small'} />
      </label>
      {issues && <div className={cn("error")}>{issues}</div>}
      <Button
        type="submit"
        disabled={isSubmitting}
        style="primary"
        title={isSubmitting ? t('login.load') : t('login')}
      />
    </form>
  );
}

export default memo(LoginForm);
