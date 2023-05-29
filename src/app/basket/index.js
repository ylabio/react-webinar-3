import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { AppRoute } from '../../const';

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return (
      <ItemBasket
        item={item}
        address={AppRoute.Product.replace(':id', item._id)}
        onRemove={callbacks.removeFromBasket}
        onClose={callbacks.closeModal}
        text={dict[select.lang].remove}
      />);
    }, [callbacks.removeFromBasket, callbacks.closeModal, select.lang]),
  };

  const dict = {
    rus: {
      basket: 'Корзина',
      close: 'Закрыть',
      remove: 'Удалить',
    },
    eng: {
      basket: 'Basket',
      close: 'Close',
      remove: 'Remove',
    }
  }

  return (
    <ModalLayout title={dict[select.lang].basket} closeText={dict[select.lang].close} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} lang={select.lang}/>
      <BasketTotal sum={select.sum} lang={select.lang}/>
    </ModalLayout>
  );
}

export default memo(Basket);
