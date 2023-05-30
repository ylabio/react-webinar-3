import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {translation} from "../../translation";

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentLang: state.translation.currentLang
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store.actions.basket]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store.actions.modals]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket link={`/item/${item._id}`} translation={translation.basket[select.currentLang]} onClose={callbacks.closeModal} item={item} onRemove={callbacks.removeFromBasket}/>
    }, [select.basket, callbacks.closeModal, callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout translation={translation.basket[select.currentLang]} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal translation={translation.basket[select.currentLang]} sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
