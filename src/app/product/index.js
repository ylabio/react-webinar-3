import { memo, useCallback, useEffect } from 'react';
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

    const select = useSelector(state => ({
      list: state.catalog.list,
      item: state.item.item,
      amount: state.basket.amount,
      sum: state.basket.sum,
    }));

    // при обновлении (F5) на странице товара добавить товар в корзину невозможно, так как list пустой
    select.list.length == 0 && Object.keys(select.item).length != 0 && store.actions.catalog.addItem(select.item)

  useEffect(() => {
    store.actions.item.loaditem(id);
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(e => store.actions.basket.addToBasket(id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.item.title ? select.item.title : "Магазин"} />
      <div className='product-modified-top'>
        <Link className='product-backhome' to={'/'}>Главная</Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </div>
      <CurrentItem item={select.item} addToBasket={callbacks.addToBasket} />
      <Button className={'product-button'} style={'primary'} onClick={callbacks.addToBasket} title={'Добавить'} />
    </PageLayout>
  );
}

export default memo(Product);
