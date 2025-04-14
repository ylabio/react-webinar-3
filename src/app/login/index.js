import { memo, useCallback, useMemo, useEffect } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import Input from '../../components/input';
import Button from '../../components/button';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import LoginMenu from '../login-menu';

function Login() {
  const store = useStore();
  const cn = bem('Login');
  const navigate = useNavigate();
  const location = useLocation();

  useInit(() => {}, []);

  useEffect(() => {
    document.title = 'Магазин / Логин';
  }, []);

  const select = useSelector(state => ({
    auth: state.authorization,
  }));

  const { t } = useTranslate();

  const callbacks = {
    onLogin: useCallback(
      evt => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const data = {
          login: formData.get('login'),
          password: formData.get('password'),
        };
        console.log('Form data---');
        console.log(data);
        store.actions.authorization.loginUser(data);
      },
      [store],
    ),
  };

  return (
    <>
      <LoginMenu />
      <Head title="Магазин / Логин">
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <p className={cn('title')}>Вход</p>
        <form className={cn('form')} onSubmit={callbacks.onLogin}>
          <div className={cn('input')}>
            <p className={cn('label')}>Логин</p>
            <Input name="login" />
          </div>
          <div className={cn('input')}>
            <p className={cn('label')}>Пароль</p>
            <Input name="password" type="password" />
          </div>
          <span className={cn('error')}>{select.auth.error || ''}</span>
          <Button type="submit" style="primary" title="Войти" />
        </form>
      </PageLayout>
    </>
  );
}

export default memo(Login);
