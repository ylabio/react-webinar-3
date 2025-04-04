import { memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import CurrentItem from '../../components/currentitem/index'
import { useParams } from 'react-router';
import './styles.css'
import Button from '../../components/button'

function Product() {
    const store = useStore()
    const { id } = useParams()
    const [item, setItem] = useState({})

  useEffect(() => {
    fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`).then(response => response.json()).then(response => setItem(response.result))
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(e => store.actions.basket.addToBasket(id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={item.title ? item.title : "Магазин"} />
      <div className='product-modified-top'>
        <Link to={'/'}>Главная</Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </div>
      <CurrentItem item={item} addToBasket={callbacks.addToBasket} />
      <Button style={'primary'} onClick={callbacks.addToBasket} title={'Добавить'} />
    </PageLayout>
  );
}

export default memo(Product);
