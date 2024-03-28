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
  const {lang} = useTranslate();
  useInit(async () => {
      //store.actions.article.load(params.id);
      dispatch(articleActions.load(params.id));
      //store.comments.article.load(params.id);
      dispatch(commentsActions.load(params.id))



  }, [params.id, lang]);

  const data = useSelector(state => ({
    token: state.session.token,
    _id: state.session.user._id
  }))
  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    list: state.comments.list,
    comWaiting: state.comments.comWaiting,


  }), shallowequal);
  const {t} = useTranslate();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
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
      <CommentList list={select.list.items} count={select.list.count} id={params.id} auth={data.token ? true : false} t={t} user={data._id}/>
    </PageLayout>
  );
}

export default memo(Article);
