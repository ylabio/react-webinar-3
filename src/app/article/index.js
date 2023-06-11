import { memo, useCallback} from 'react';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import {useParams} from "react-router-dom";
import shallowequal from "shallowequal";
import ArticleCard from "../../components/article-card";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import Spinner from "../../components/spinner";

import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import TopHead from "../../containers/top-head";
import useInit from "../../hooks/use-init";

import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import actionsComments from '../../store-redux/article-comments/actions';
import articleActions from '../../store-redux/article/actions';
import CommentsSection from "../../containers/comments-section";


function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();
  const {t} = useTranslate();

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
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    sendComment: useCallback(comment => dispatch(actionsComments.send(comment)), []),
  }

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
        <CommentsSection id={params.id} comments={select.comments} t={t} send={callbacks.sendComment}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);