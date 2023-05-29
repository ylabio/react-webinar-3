import {memo, useCallback, useEffect} from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemDescription from "../../components/item-description";
import {useParams} from "react-router-dom";
import DualAlign from "../../components/dual-align";
import NavMenu from "../../components/nav-menu";
import Spinner from "../../components/spinner";

function ItemInfo() {

  const store = useStore();
  const {id} = useParams();

  useEffect(() => {
    store.actions.itemDescription.loadItem(id);
  }, [id, store.actions.itemDescription]);

  const select = useSelector(state => ({
    item: state.itemDescription.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isFetching: state.itemDescription.isFetching
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.item.title}/>
      <DualAlign leftComponent={<NavMenu />}
                 rightComponent={<BasketTool onOpen={callbacks.openModalBasket}
                                             amount={select.amount}
                                             sum={select.sum}/>}
      />
      {select.isFetching && <Spinner/>}
      <ItemDescription item={select.item} onAdd={callbacks.addToBasket}/>
    </PageLayout>
  );
}

export default memo(ItemInfo);
