import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';

import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import shallowequal from 'shallowequal';

import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import Comments from '../../containers/comments';

import articleActions from '../../store-redux/article/actions';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import HeadLayout from '../../components/head-layout';

function Article() {
  const store = useStore();
  const { t, lang } = useTranslate();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
  }, [params.id, lang]);

  const select = useSelectorRedux(
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
          <Comments id={params.id} />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Article);
