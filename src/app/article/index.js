import { memo, useCallback, useEffect } from 'react';
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
import CommentList from '../../components/comments-tree';
import useSelectorStore from '../../hooks/use-selector';
import useServices from '../../hooks/use-services';

function Article() {
  const store = useStore();
  const selectStore = useSelectorStore(state => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  const dispatch = useDispatch();

  // Параметры из пути /articles/:id
  const params = useParams();



  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  // Подписка на изменения языка
  const services = useServices();
  useEffect(() => {
    const unsubscribe = services.i18n.subscribe(() => {
      // Повторно загружаем статью и комментарии на новом языке
      dispatch(articleActions.load(params.id));
      dispatch(commentsActions.load(params.id));
    });

    return () => unsubscribe(); // отписка при размонтировании
  }, [params.id, dispatch, services.i18n]);

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
          <CommentList comments={select.comments} productId={params.id} user={selectStore.user} isAuthorized={selectStore.exists} />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Article);
