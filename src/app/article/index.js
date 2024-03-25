import { memo, useCallback, useMemo, useState } from "react";
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
import { default as oldSelector } from "../../hooks/use-selector";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import articleCommentsActions from "../../store-redux/article-comments/actions";
import CommentsHead from "../../components/comments-head";
import CommentsItem from "../../components/comments-item";
import CommentsList from "../../components/comments-list";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import CommentForm from "../../components/comment-form";

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  // const [formId, setFormId] = useState("");

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

  const session = oldSelector((state) => ({
    username: state.session.user.profile?.name,
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
    // Запоминаем id элемента с открытой формой комментария
    setFormId: useCallback(
      (_id) => {
        dispatch(articleCommentsActions.setFormId(_id));
      },
      [dispatch]
    ),
    // Отмена ввод комментария
    onCloseForm: useCallback(() => {
      dispatch(articleCommentsActions.setFormId(""));
    }, [dispatch]),

    // Отправка сообщения
    onCommentSend: useCallback(
      (_id, _type, text) => {
        dispatch(
          articleCommentsActions.send(
            session.username,
            session.token,
            _id,
            _type,
            text
          )
        );
      },
      [dispatch, session.token, session.username, params.id]
    ),
  };

  const comments = useMemo(
    () => [
      ...treeToList(listToTree(select.comments), (item, level) => ({
        _id: item._id,
        offset: level,
        username: item.author?.profile.name,
        date: item.dateCreate,
        text: item.text,
      })).slice(1),
    ],
    [select.comments]
  );

  const renders = {
    commentsItem: useCallback(
      (comment) => (
        <CommentsItem
          comment={comment}
          setFormId={callbacks.setFormId}
          session={session}
        />
      ),
      [session]
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
        <CommentsList
          list={comments}
          renderItem={renders.commentsItem}
          formId={select.formId}
          session={session.exists}
          onCloseForm={callbacks.onCloseForm}
          onCommentSend={callbacks.onCommentSend}
        />
      </Spinner>
      {select.formId === "" && (
        <CommentForm
          type="article"
          session={session.exists}
          formId={params.id}
          onCommentSend={callbacks.onCommentSend}
        />
      )}
    </PageLayout>
  );
}

export default memo(Article);
