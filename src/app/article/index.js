import { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
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
import Comments from '../../containers/comments';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';

function Article() {
  const store = useStore();
  const {translateService, locale} = useTranslate();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();
  
  useEffect(() => {
    dispatch(articleActions.load(params.id));
  }, [locale]);

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    comments: state.comments.data,
    articleWaiting: state.article.waiting,
    commentsWaiting: state.comments.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

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
      <Spinner active={select.articleWaiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={translateService}/>
      </Spinner>
      <Spinner active={select.commentsWaiting}>
        <Comments articleId={select.article._id} comments={select.comments} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
