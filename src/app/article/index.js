import { useEffect, memo, useCallback } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router';
import NavHead from '../../components/nav-head';
import ArticleCard from '../../components/article-card';
import Basket from '../basket';
import { article } from '../../store/exports';

function Article() {
  const store = useStore();
  const { _id } = useParams();

  const select = useSelector(state => ({
    article: state.article.article,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeModal: state.modals.name,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  useEffect(() => {
    store.actions.article.getArticle(_id);
  }, [_id, store]);

  if (select.article._id !== _id) return null;

  return (
    <>
      <PageLayout>
        <Head title={select.article.title} />
        <NavHead onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} />
      </PageLayout>
      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default memo(Article);
