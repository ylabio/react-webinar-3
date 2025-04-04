import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router';
import ItemDescription from '../../components/item-description';
import Navbar from '../../components/navbar';

function ItemDetails() {
  const store = useStore();
  const { id } = useParams();

  useEffect(() => {
    store.actions.itemDetails.loadItem(id);
  }, []);

  const select = useSelector(state => ({
    item: state.itemDetails.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  if (!select.item) return null;

  return (
    <PageLayout>
      <Head title={select.item.title} />
      <Navbar onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ItemDescription item={select.item} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(ItemDetails);
