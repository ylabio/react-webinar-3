import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket({language}) {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} language={language} link={`/post/${item._id}`} closeModal={callbacks.closeModal}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title='Корзина' onClose={callbacks.closeModal} language={language}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal language={language} sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
