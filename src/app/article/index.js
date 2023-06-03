import {memo, useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";

import Navigation from "../../containers/navigation";
import LoginMenu from "../../containers/login-menu";
import LocaleSelect from "../../containers/locale-select";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";

function Article() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  // Сбрасываем данные о товаре при демонтировании компонента,
  // чтобы при следующем открытии страницы Article не происходило мерцания данных о прошлом товаре
  useEffect(() => {
    return () => {
      store.actions.article.reset();
    } 
  }, []);

  const select = useSelector(state => ({
    article: state.article.data,
    isExist: state.article.isExist,
    waiting: state.article.waiting,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <LoginMenu/>
      <Head title={select.article?.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} isExist={select.isExist} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
