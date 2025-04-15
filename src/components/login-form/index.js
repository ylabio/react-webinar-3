import { memo, useState, useEffect } from 'react';
import { cn as bem } from '@bem-react/classname';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import Button from '../../components/button';
import Input from '../../components/input';
import './style.css';

function LoginForm() {
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
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    store.actions.auth.signIn(login, password);
  };

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
      <Button type="submit" disabled={waiting} style="primary" title={waiting ? t('login.load') : t('login')}/>
    </form>
  );
}

export default memo(LoginForm);
