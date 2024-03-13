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
    locale: state.translator.locale
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Перевод текста
    translate: useCallback(text => store.actions.translator.translate(text), [store, select.locale]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket 
        item={item}
        url={`/article/${item._id}`}
        onRemove={callbacks.removeFromBasket}
        onClick={callbacks.closeModal}
        translate={callbacks.translate}/>
    }, [callbacks.removeFromBasket, callbacks.translate]),
  };

  return (
    <ModalLayout
      title={callbacks.translate('cart')}
      btnCloseTitle={callbacks.translate('close')}
      onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} labelTotal={callbacks.translate('total')}/>
    </ModalLayout>
  );
}

export default memo(Basket);
