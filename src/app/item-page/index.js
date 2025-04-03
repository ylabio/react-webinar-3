import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head';
import ItemDetails from '../../components/item-details';
import PageLayout from '../../components/page-layout';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

function ItemPage() {
  const store = useStore();
  const { itemId } = useParams();

  useEffect(() => {
    return () => {
      // Сброс выбранного товара
      store.actions.catalog.selectItem(null);
    };
  }, []);

  useEffect(() => {
    store.actions.catalog.getItemInfoById(itemId);
  }, [itemId]);

  const select = useSelector(state => ({
    item: state.catalog.selectedItem,
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
      <Head title={select.item && select.item.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      {select.item && <ItemDetails item={select.item} onAdd={callbacks.addToBasket} />}
    </PageLayout>
  );
}

export default memo(ItemPage);
