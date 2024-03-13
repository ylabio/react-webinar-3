import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language
  }));

  const isRus = select.lang === "ru"

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket closeModal={callbacks.closeModal} item={item} link={`/product/${item._id}`} onRemove={callbacks.removeFromBasket} lang={select.lang}/>
    }, [callbacks.removeFromBasket, select.lang]),
  };

  return (
    <ModalLayout lang={select.lang} title={isRus ? "Корзина" : "Basket"} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal lang={select.lang} sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
