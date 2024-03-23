import { memo, useCallback, useMemo } from "react";
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
import { useDispatch, useSelector as useReduxSelector } from "react-redux";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import commentsActions from "../../store-redux/comments/actions";
import newCommentActions from "../../store-redux/comments/new/actions";
import Comments from "../../containers/comments";
import CommentList from "../../components/comment-list";
import NewComment from "../../components/new-comment";
import useSelector from "../../hooks/use-selector";
import getNestedComments from "../../utils/comment-tree";

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(async () => {
    await Promise.all([
      dispatch(articleActions.load(params.id)),
      dispatch(commentsActions.load(params.id)),
    ]);
  }, [params.id]);
  //useInit(() => dispatch(articleActions.load(params.id)), [params.id]);

  const select = useReduxSelector(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      count: state.comments.count,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const session = useSelector((state) => ({
    exists: state.session.exists,
    token: state.session.token,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),

    // openReply: useCallback((_id) => {
    //   dispatch(commentsActions.openReply(_id));
    // }, []),

    // closeReply: useCallback((_id) => {
    //   dispatch(commentsActions.closeReply(_id));
    // }, []),

    // sendReply: useCallback((parentId, text) => {
    //   const data = {
    //     text: text,
    //     parent: { _id: parentId, _type: "comment" },
    //   };
    //   dispatch(newCommentActions.sendComment(data));
    //   dispatch(commentsActions.load(params.id));
    //   // console.log(select.comments);
    // }, []),

    // sendComment: useCallback((text) => {
    //   const data = {
    //     text: text,
    //     parent: { _id: params.id, _type: "article" },
    //   };

    //   dispatch(newCommentActions.sendComment(data));

    //   if (select.sent === true && !select.newCommentWaiting) {
    //     dispatch(commentsActions.load(params.id));
    //     console.log(select.comments);
    //   }
    // }, []),
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
