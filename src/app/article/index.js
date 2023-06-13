import { memo, useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import TopHead from "../../containers/top-head";
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from "shallowequal";
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions'
import Comments from '../../components/comments';
import { transformComments } from '../../utils/comments-to-tree';
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

function Article() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();
  const { lang } = useTranslate();
  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id))
  }, [params.id, lang]);


  const select = useSelectorRedux(state => ({
    article: state.article.data,
    comments: state.comments.data,
    commentsCount: state.comments.count,
    waiting: state.article.waiting,
    commentWaiting: state.comments.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const selector = useSelector(state => ({
    exists: state.session.exists,
    user: state.session.user
  }))
  const { t } = useTranslate();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    addComment: useCallback((text, parent) => dispatch(commentsActions.addComment(text, parent)), [dispatch]),
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  }

  
  function createCommentsTree() {
    let tree = [];
    let newComments = [];
    let finalTree = [];
    if (select.comments.items && params.id) {
      tree = listToTree(select.comments.items, params.id);
      newComments = treeToList(tree, (item, level) => ({...item, level}));
      finalTree = listToTree(newComments, params.id);
    }
    return finalTree
  }

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
        <Spinner active={select.commentWaiting}>
        {select.comments.items && <Comments comments={createCommentsTree()} commentsCount={select.commentsCount} addComment={callbacks.addComment} articleId={params.id} exists={selector.exists} userId={selector.user._id} onSignIn={callbacks.onSignIn} />}
        </Spinner>
      </Spinner>
    </PageLayout>
  );
}


export default memo(Article);