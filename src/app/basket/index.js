import React, {memo, useCallback, useEffect, useState} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {
  const store = useStore();
  const locale = useSelector(state => state.locale)
  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => { 
    store.actions.basket.reRender();
  },[])

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} onClick = {callbacks.closeModal} link = {`/product/${item._id}`} locale ={locale.translations.basket}/>
    }, [callbacks.removeFromBasket,locale]),
  };
  return (
    <ModalLayout title={locale.translations.basket.basket} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} locale={locale.translations.basket}/>
    </ModalLayout>
  );
}

export default Basket;
