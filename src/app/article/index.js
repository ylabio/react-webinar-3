import {memo, useCallback, useMemo} from 'react';
import {useParams} from 'react-router-dom';
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
import AuthHeader from '../../components/auth-header';
import QuitHeader from '../../components/quit-header';

function Article() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
    currentUser: state.profile.currentUser,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),

    logout: useCallback(() => {
      store.actions.profile.logout();
    }),
  };

  return (
    <PageLayout>
      {select.currentUser ? (
        <QuitHeader
          link={`/profile/${select.currentUser.id}`}
          name={select.currentUser.name}
          onLogout={callbacks.logout}
        />
      ) : (
        <AuthHeader link={'/login'} />
      )}
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
