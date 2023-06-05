import {memo, useCallback} from 'react';
import {useParams} from "react-router-dom";
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
import LoginSide from "../../components/login-side";

function Article() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    loginStatus: state.user.loginStatus,
    userName: state.user.userProfile.name
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    logout: useCallback(() => store.actions.user.logout(), [store])
  }

  return (
    <PageLayout>
      <LoginSide loginStatus={select.loginStatus} userName={select.userName} onLogout={callbacks.logout} t={t}/>
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

//Минимум это Incorrect data из поля errors, но лучше вытащить все тексты из issues. Вообще они там распределяются по названиям полей в path. Специфически, но всё же. Если в path ничего нет, значит это общая ошибка, не относится к какому-то полю. В форме вроде только такая и есть.