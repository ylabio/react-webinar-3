import {memo, useCallback} from 'react';
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useLanguage} from "../../language-provider";
import ModalLayout from "../../components/modal-layout";
import ItemBasket from "../../components/item-basket";
import BasketTotal from "../../components/basket-total";

function Basket() {

  const { t } = useLanguage()

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
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket}/>
    }, [callbacks.removeFromBasket]),
  };


  return (
    <ModalLayout title={t('basket')} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
