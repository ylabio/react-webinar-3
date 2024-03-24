import { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import shallowequal from "shallowequal";
import ArticleCard from "../../components/article-card";
import Comments from "../../components/comments";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import TopHead from "../../containers/top-head";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import articleActions from "../../store-redux/article/actions";
import commentsActions from "../../store-redux/comments/actions";
import dateFormat from "../../utils/date-format";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

function Article() {
  const [activeReplyId, setActiveReplyId] = useState(null);

  const store = useStore();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const isValidSession = useSelector((state) => state.session.exists);

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data.items,
      amountComments: state.comments.data.count,
      waitingComments: state.comments.waiting,
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
    onReply: useCallback((id) => setActiveReplyId(id), [setActiveReplyId]),
    onSubmit: (e) => {
      e.preventDefault();
      if (!e.target.text.value) return;
      dispatch(
        commentsActions.post({
          text: e.target.text.value,
          parent: {
            _id: activeReplyId ? activeReplyId : select.article._id,
            _type: activeReplyId ? "comment" : "article",
          },
        })
      );
      setActiveReplyId(null);
    },
    onCancel: useCallback(() => {
      setActiveReplyId(null);
    }, [setActiveReplyId]),
    onLogin: () => {
      navigate("/login", { state: { back: `/articles/${params.id}` } });
    },
  };

  const options = {
    comments: useMemo(() => {
      return treeToList(listToTree(select.comments), (item, level) => ({
        _id: item._id,
        text: item.isDeleted ? "Комментарий удален" : item.text,
        date: dateFormat(item.date),
        author: item?.author?.profile?.name || "Аноним",
        level: level - 1,
        parent:
          !item.parent || item.parent._type == "article" ? {} : item.parent,
      })).slice(1);
    }, [select.comments]),
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
      <Spinner active={select.waitingComments}>
        <Comments
          exi
          items={options.comments}
          amount={select.amountComments}
          activeReplyId={activeReplyId}
          onReply={callbacks.onReply}
          onSubmit={callbacks.onSubmit}
          onCancel={callbacks.onCancel}
          onLogin={callbacks.onLogin}
          isValidSession={isValidSession}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
