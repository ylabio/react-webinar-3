import { memo, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import AuthField from '../../components/auth-field';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();

  const session = useSelector(state => state.session);
  const profile = useSelector(state => state.profile);

  const navigate = useNavigate();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const { t } = useTranslate();

  const handleLogout = async () => {
    await store.actions.session.logout();
    navigate('/');
  };

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  return (
    <>
      <Head
        title={t('title')}
        authField={<AuthField user={profile.user} token={session.token} callback={handleLogout} />}
      >
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
