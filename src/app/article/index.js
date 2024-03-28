import {memo, useLayoutEffect} from 'react';
import {useParams} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import {useDispatch,useSelector} from 'react-redux';
import articleActions from '../../store-redux/article/actions';
import articleCommentsActions from '../../store-redux/article-comments/actions';
import ArticleCommentsMain from '../../containers/article-comments-main';
import ArticleCardMain from '../../containers/article-card-main';
import shallowequal from 'shallowequal';
import useTranslate from '../../hooks/use-translate';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  const {lang, refresh, setRefresh} = useTranslate();

  useLayoutEffect(() => {
    if (refresh == true) {
      dispatch(articleActions.load(params.id));
      dispatch(articleCommentsActions.load(params.id));
      store.actions.catalog.initParams({lang: lang});
      setRefresh(false);
    }
  }, [store,refresh,setRefresh,params.id]);

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(articleCommentsActions.load(params.id));
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }), shallowequal);

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCardMain/>
        <ArticleCommentsMain/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
