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
import commentsActions from "../../store-redux/comments/actions";
import Comments from "../../containers/comments";

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelector(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.comments,
      t: state,
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
    addCommentArticle: useCallback(
      (element, comment) => {
        dispatch(
          commentsActions.sendCommentArticle(
            store.state.session?.user,
            comment,
            params.id
          )
        );
      },
      [store]
    ),
    addComment: useCallback(
      (user, comment) => {
        dispatch(commentsActions.sendComment(user, comment));
      },
      [store]
    ),
    isAuth: useCallback(() => store.state.session.exists, [store]),
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
        <Comments
          addCommentArticle={callbacks.addCommentArticle}
          addComment={callbacks.addComment}
          id={params.id}
          comments={select.comments}
          isAuth={callbacks.isAuth}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
