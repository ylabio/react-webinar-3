import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useNavigate} from 'react-router-dom';

function Basket() {

  const store = useStore();
  const navigate = useNavigate()

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.lang
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket}
        closeModal={callbacks.closeModal} lang={select.lang} />
    }, [callbacks.removeFromBasket, select.lang]),
  };

  return (
    <ModalLayout title='Корзина' onClose={callbacks.closeModal} lang={select.lang}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} lang={select.lang} />
    </ModalLayout>
  );
}

export default memo(Basket);
