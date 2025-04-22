import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import shallowequal from 'shallowequal';
import ArticleCard from '../../components/article-card';
import Head from '../../components/head';
import HeadLayout from '../../components/head-layout';
import PageLayout from '../../components/page-layout';
import Spinner from '../../components/spinner';
import CommentsList from '../../containers/comments-list';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import TopHead from '../../containers/top-head';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  const { t, lang } = useTranslate();

  useInit(async () => {
    await Promise.all([
      dispatch(articleActions.load(params.id)),
      dispatch(commentsActions.load(params.id)),
    ]);
  }, [params.id, lang]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  return (
    <>
      <HeadLayout>
        <TopHead />
      </HeadLayout>
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
        </Spinner>
        <CommentsList articleId={params.id} />
      </PageLayout>
    </>
  );
}

export default memo(Article);
