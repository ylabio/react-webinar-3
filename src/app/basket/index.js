import {memo, useCallback} from 'react';
import useSelector from "../../store/use-selector";
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const lPack = useSelector(state => state.lang.lPack);

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    getPhrase: useCallback((phraseGroup, phraseCode, phraseDefault) => 
      store.actions.lang.getPhrase(phraseGroup, phraseCode, phraseDefault), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} getPhrase={ callbacks.getPhrase } />
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={ callbacks.getPhrase('cart', 'title', 'Cart') } onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} getPhrase={ callbacks.getPhrase } />
    </ModalLayout>
  );
}

export default memo(Basket);
