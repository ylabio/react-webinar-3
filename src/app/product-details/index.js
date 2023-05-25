import {memo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Item from '../../components/item';
import {cn as bem} from '@bem-react/classname';

import {useParams, useNavigate} from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import './style.css';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import ItemProduct from '../../components/item-product';
import BasketTool from '../../components/basket-tool';

function ProductDetails() {
  const cn = bem('Product');

  const params = useParams();
  console.log(params);
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    history('/');
  };

  const store = useStore();
  useEffect(() => {
    store.actions.product.loadProduct(params.id);
  }, []);

  const select = useSelector((state) => ({
    productList: state.product.productList,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open('basket'),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title='Название товара' />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemProduct
        productList={select.productList}
        onAdd={callbacks.addToBasket}
      />
    </PageLayout>
  );
}

export default memo(ProductDetails);
