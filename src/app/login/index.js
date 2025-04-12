import { memo, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
// import PageLayout from '../../components/page-layout';
// import Head from '../../components/head';
import Spinner from '../../components/spinner';
import articleCard from '../../components/article-card';
// import LocaleSelect from '../../containers/locale-select';
import { cn as bem } from '@bem-react/classname';
import LoginEntry from '../../containers/login-entry';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Параметры из пути /articles/:id
  // const params = useParams();

  // useInit(() => {
  //   store.actions.user.initState();
  // }, [store]);

  const token = localStorage.getItem('token');
  if (token) {
    // store.actions.user.load().then(() => {
        navigate('/');
    // });
  }

  const select = useSelector(state => ({
    // article: state.select.article.data,
    // waiting: state.select.article.waiting,
    error: state.user.error,
  }));



  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    // addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    
    signIn: useCallback((username, password) => {
      console.log('Передача данных', username, password);
      store.actions.user.signIn(username, password);
      navigate("/");
    }, [store])
    
  };

  // const cn = bem('articleCard');

  return (
    <>
      <LoginEntry />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm username={username} password={password} setUsername={setUsername} error={select.error} setPassword={setPassword} signIn={callbacks.signIn}  />
      </PageLayout>
    </>
  );
}

export default memo(Login);
