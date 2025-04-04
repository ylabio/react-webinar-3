import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ProductItem from '../../components/product-item';
import Loader from '../../components/loader';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Article() {
  const store = useStore();
  const params = useParams();

  useEffect(() => {
    store.actions.product.load(params.id);
  }, []);

  const select = useSelector(state => ({
    product: state.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <>
      {select.product.loading && <Loader />}
      <PageLayout>
        <Head title={select.product.item.title} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        {select.product.item && !select.product.loading &&
          <ProductItem product={select.product} onAdd={callbacks.addToBasket} />
        }
      </PageLayout>
    </>

  );
}

export default memo(Article);
