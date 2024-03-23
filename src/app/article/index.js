import {memo, useCallback, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import useSelector from '../../hooks/use-selector';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import CommentList from '../../containers/comment-list';
import useServices from '../../hooks/use-services';

function Article() {
  const store = useStore();
  const services = useServices();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(async () => {
      //store.actions.article.load(params.id);
      dispatch(articleActions.load(params.id));
      //store.comments.article.load(params.id);
      dispatch(commentsActions.load(params.id))



  }, [params.id]);

  const data = useSelector(state => ({
    token: state.session.token,
  }))
  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    list: state.comments.list,
    comWaiting: state.comments.comWaiting,
    lista: state.comments.list,


  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  // comments: state.comments.data,
  // commWaiting: state.comments.waiting
  const {t} = useTranslate();
  const header = {
    "Content-Type": "application/json",
    "X-Token": data.token
  }
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    addComment: useCallback((text,id,type) => services.api.request({
      url:'api/v1/comments?lang=ru&fields=*', 
      method:'POST', 
      headers: JSON.stringify(header),
      body: JSON.stringify({
        "text": `${text}`,
        "parent": {"_id":  `${id}`, "_type":  `${type}`}
      })
    }), [services])
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
      <CommentList list={select.list} id={params.id} addComment={callbacks.addComment} auth={data.token ? true : false}/>
    </PageLayout>
  );
}

export default memo(Article);
