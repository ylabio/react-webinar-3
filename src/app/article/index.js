import { memo, useCallback } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { useParams } from "react-router-dom";
import shallowequal from "shallowequal";
import ArticleCard from "../../components/article-card";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import Spinner from "../../components/spinner";
import Comments from "../../containers/comments";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import TopHead from "../../containers/top-head";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import articleActions from "../../store-redux/article/actions";

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  return (
    <PageLayout>
      <TopHead />
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
      <Comments />
    </PageLayout>
  );
}

export default memo(Article);
