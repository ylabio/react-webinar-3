import { memo, useCallback, useEffect } from 'react';

import { useParams } from 'react-router';

import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import DetailItem from '../../components/detailItem';
import Button from '../../components/button';

function Article() {
  let { id } = useParams();
  const store = useStore();

  useEffect(() => {
    if (id) {
      store.actions.article.load(id);
    }
  }, [store, id]);

  const select = useSelector(state => ({
    item: state.article.item,
    category: state.article.category,
    madeIn: state.article.madeIn,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.item.title} />
      <>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          main="Главная"
        />

        <DetailItem item={select.item} />

        <Button
          style="primary"
          onClick={() => callbacks.addToBasket(select.item._id)}
          title="Добавить"
        />
      </>
    </PageLayout>
  );
}

export default memo(Article);
