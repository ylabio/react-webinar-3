import {memo, useCallback} from 'react';
import {useParams, Link, useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import HeadProfile from '../../components/head-profile';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  const navigate = useNavigate();

  useInit(() => {
    store.actions.article.load(params.id);
    store.actions.login.initParams();
    store.actions.profile.initProfile();
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    authorized: state.login.authorized,
    name: state.profile.name
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Вызод из профиля
    onLogOut: useCallback(() => store.actions.login.logOut()),
    // Установка редиректа
    onRedirect: useCallback(() => store.actions.article.setRedirect()),
  }

  return (
    <PageLayout>
      <HeadProfile onClick={select.authorized ? 
        callbacks.onLogOut 
        : 
        () => {
          callbacks.onRedirect();
          navigate('/login');
        }}
        title={t(select.authorized ? 'login.exit' : 'login.entry')}>
        {select.authorized && <Link to='/profile'>{select.name}</Link>}
      </HeadProfile>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
