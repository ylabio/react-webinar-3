import {memo, useCallback} from 'react';
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
import commentActions from '../../store-redux/comment/actions';
import Comments from '../../containers/coments';

function Article() {
  const store = useStore();

  const {t, lang} = useTranslate();

  const dispatch = useDispatch();

  const params = useParams();

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentActions.load(params.id));
  }, [params.id, lang]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,  
    waitingComments: state.comment.waiting
  }), shallowequal);

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
      <Spinner active={select.waitingComments}>
        <Comments/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
