import { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import { useParams } from "react-router-dom";
import shallowequal from "shallowequal";
import ArticleCard from "../../components/article-card";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import Spinner from "../../components/spinner";
import Comments from '../../containers/comments';
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import TopHead from "../../containers/top-head";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import actionsComments from '../../store-redux/article-comments/actions';
import articleActions from '../../store-redux/article/actions';

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(actionsComments.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.data,
    waitingComments: state.comments.waiting,
    needReload: state.comments.needReload
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  
  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    
    // Работа с комментами
    sendComment: useCallback(comment => dispatch(actionsComments.send(comment)), []),
    removeComment: useCallback(id => dispatch(actionsComments.remove(id)), []),
  }

  // могут постоянно чтото писать и надо забирать изменения после публикации
  useEffect(() => {
    if (select.needReload)
      dispatch(actionsComments.load(params.id));
  }, [params.id, select.needReload]);

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      <Spinner active={select.waitingComments}>
        <Comments id={params.id} comments={select.comments}
          send={callbacks.sendComment}
          /* remove={callbacks.removeComment} */
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);