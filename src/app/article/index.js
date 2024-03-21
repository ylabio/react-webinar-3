import {memo, useCallback, useMemo} from 'react';
import {Navigate, useParams} from "react-router-dom";
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
import UserPanel from "../../components/user-panel";

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();


  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    loggedIn: state.auth.loggedIn,
    user: state.user.user,
    token: state.auth.token
  }));

  useInit(() => {
    store.actions.article.load(params.id);
    store.actions.user.fetchUser(select.token);
  }, [params.id, select.loggedIn, select.token]);


  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    signOut: useCallback(() => store.actions.auth.signOut(), [store]),
  }


  return (
    <PageLayout>
      <UserPanel userName={select.user?.profile?.name} callBack={select.loggedIn ? callbacks.signOut : undefined}
                 loggedIn={select.loggedIn}
                 profile={'/profile'}
                 buttonPath={!select.loggedIn ? '/login' : ''}
                 title={select.loggedIn ? t('exit') : t('enter')}/>
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
