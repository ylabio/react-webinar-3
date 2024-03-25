import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import { useDispatch, useSelector } from "react-redux";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import articleCommentsActions from "../../store-redux/article-comments/actions";
import CommentsHead from "../../components/comments-head";
import CommentsList from "../../containers/comments-list";

function Article() {
  const store = useStore();

  const dispatch = useDispatch();

  const params = useParams();

  useInit(async () => {
    await Promise.all([
      dispatch(articleActions.load(params.id)),
      dispatch(articleCommentsActions.load(params.id)),
    ]);
  }, [params.id]);

  const select = useSelector(
    (state) => ({
      article: state.article.data,
      waitingArticle: state.article.waiting,
      formId: state.articleComments.formId,
      comments: state.articleComments.data,
      count: state.articleComments.count,
      waitingComments: state.articleComments.waiting,
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
      <Spinner active={select.waitingArticle}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <CommentsHead count={select.count} />
      <Spinner active={select.waitingComments}>
        <CommentsList />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
