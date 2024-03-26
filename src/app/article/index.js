import { memo, useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { default as useSelectorStore } from "../../hooks/use-selector";
function Article() {
  const { t } = useTranslate();
  const store = useStore();
  const { currentLanguage } = useTranslate();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const selectStore = useSelectorStore((state) => ({
    isAuth: state.session.exists,
    user: state.session.user,
  }));
  // console.log(selectStore.user);

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(store)
  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id, currentLanguage, selectStore]);

  const select = useSelector(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.comments,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),

    addComment: useCallback(
      (comment, parentId) => {
        dispatch(
          commentsActions.sendComment(
            store.state.session.user,
            comment,
            parentId
          )
        );
      },
      [store]
    ),
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
    idUser: useCallback(() => store.state.session.user._id, [store]),
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
          addComment={callbacks.addComment}
          id={params.id}
          comments={select.comments}
          isAuth={selectStore.isAuth}
          idUser={callbacks.idUser}
          onSignIn={callbacks.onSignIn}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
