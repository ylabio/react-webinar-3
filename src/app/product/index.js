import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router';
import Table from '../../components/table';
import Button from '../../components/button';
import './style.css';

function Product() {
  const store = useStore();
  const params = useParams();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    title: state.product.title,
    description: state.product.description,
    price: state.product.price,
  }));

  useEffect(() => {
    store.actions.modals.close();
  }, []);

  useEffect(() => {
    store.actions.product.load(params.productID);
  }, [params.productID]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(params.productID, select.price), [store, params, select]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout title="Product">
      <Head title={select.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <p className="Description">{select.description}</p>
      <Table />
      <p className='Price'>Цена: {select.price}₽</p>
      <Button style="primary" onClick={callbacks.addToBasket} title="Добавить" />
    </PageLayout>
  );
}

export default memo(Product);