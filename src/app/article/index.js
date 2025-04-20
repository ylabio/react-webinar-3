import { memo, useCallback } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import HeadLayout from '../../components/head-layout';
import commentsActions from '../../store-redux/comments/actions';
import CommentsListContainer from '../../containers/comments-list';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();
  const { lang } = useTranslate();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id, lang]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.items,
      count: state.comments.count,
      commentsWaiting: state.comments.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    addComment: useCallback(async (text, parentId, parentType) => {
      try {
        await dispatch(commentsActions.addComment(text, parentId, parentType));
      } catch (e) {
        throw e;
      }
    }, [dispatch]),
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
        <Spinner active={select.commentsWaiting}>
          <CommentsListContainer articleId={params.id} />
        </Spinner>
      </Spinner>
    </PageLayout>
  </>
);
}

export default memo(Article);
