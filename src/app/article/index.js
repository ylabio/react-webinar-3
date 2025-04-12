import { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import ProfileHeader from '../../components/profile-header';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();
  const token = localStorage.getItem('token');
  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    isAuth: state.auth.isAuth,
    userName: state.auth.userName,
  }));
  const linksNav = {
    in: '/login',
    me: '/profile',
    out: '/',
  };

  // Параметры из пути /articles/:id
  const params = useParams();
  useEffect(() => {
    if (token && !select.isAuth) {
      store.actions.auth.checkAuth(token);
    }
  }, []);

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onLogout: useCallback(token => store.actions.auth.logout(token), [store]),
  };

  return (
    <>
      <ProfileHeader
        isAuth={select.isAuth}
        userName={select.userName}
        onClick={() => callbacks.onLogout(token)}
        links={linksNav}
      />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Article);
