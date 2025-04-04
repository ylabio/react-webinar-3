import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head';
import ItemInfo from '../../components/item-info';
import PageLayout from '../../components/page-layout';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

function ItemPage() {
  const store = useStore();
  const { id } = useParams();

  const select = useSelector(state => ({
    item: state.catalog.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language,
  }));

  useEffect(() => {
    store.actions.catalog.loadItemById(id);
  }, [id, select.lang]);

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
      {select.item && <ItemInfo item={select.item} addToBasket={callbacks.addToBasket} />}
    </PageLayout>
  );
}

export default memo(ItemPage);
