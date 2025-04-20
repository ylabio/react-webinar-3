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
import commentsActions from '../../store-redux/comments/actions';
import HeadLayout from '../../components/head-layout';
import listToTree from '../../utils/list-to-tree';
import CommentList from '../../components/comment-list';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();

  const params = useParams();

  useInit(() => {
    // store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
    // store.actions.comments.getCommentsById(params.id);
  }, [params.id]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data,
      count: state.comments.count,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };
  
  let buildComments = [];
  
  if (Array.isArray(select?.comments) && select.comments.length > 0) {
    buildComments = listToTree(select?.comments)[0].children;
  } else {
    console.log('Комментарии еще не загружены или пусты');
  }

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
          <CommentList comments={buildComments} commentCount={select?.count} />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Article);
