import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import {useDispatch, useSelector} from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions'
import useSelectorStore from '../../hooks/use-selector';
import Comments from '../../components/comments';
import useServices from '../../hooks/use-services';
import {cn as bem} from '@bem-react/classname';
import listToTree from '../../utils/list-to-tree';

function Article() {
  const store = useStore();
  const services = useServices();
  const cn = bem('ArticleCard');
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {t, lang} = useTranslate();

  useInit(() => {
    // store.actions.article.load(params.id);
    dispatch(commentsActions.load(params.id));
    dispatch(articleActions.load(params.id));
  }, [params.id,lang]);
  
  

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    count: state.comments.count,
    list: state.comments.list,
    isWaiting: state.comments.isWaiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const selectStore = useSelectorStore(state => ({
    exists: state.session.exists,
    user: state.session.user
  }));

  let currentName = selectStore.user?.profile?.name;
  
  

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),

    createFirstComment: useCallback((value,type) =>  dispatch(commentsActions.createComment(params.id,value,type)), [store]),

    createAnswerComment: useCallback((id,value,type) =>  dispatch(commentsActions.createComment(id,value,type)), [store]),

    load: useCallback(() => dispatch(commentsActions.load(params.id)), [store]),

    loginNavigate: useCallback(e =>{
      e.preventDefault();
      navigate('/login', {state: {back: location.pathname}});
    })

  }
  
  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} count={select.count} isAuth={selectStore.exists} list={select.list}/>
      </Spinner>
      <Comments  loginNavigate={callbacks.loginNavigate} currentName={currentName} isAuth={selectStore.exists} list={select.list} count={select.count} createFirstComment={callbacks.createFirstComment} createAnswerComment={callbacks.createAnswerComment} load={callbacks.load}/>
    </PageLayout>
  );
}

export default memo(Article);
