import {memo, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ItemInfo from '../../components/item-info';

function Info() {

  let {itemId} = useParams();

  const store = useStore();

  useEffect(() => {
    store.actions.info.load(itemId);
  }, [itemId]);

  const select = useSelector(state => ({
    title: state.info.title,
    amount: state.basket.amount,
    sum: state.basket.sum,
    itemInfo: state.info.itemInfo
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ItemInfo itemId={itemId} itemInfo={select.itemInfo} onAdd={callbacks.addToBasket}/>
    </PageLayout>

  );
}

export default memo(Info);
