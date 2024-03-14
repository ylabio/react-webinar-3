import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useLanguage } from '../../languageContext';

function Basket() {

  const store = useStore();
  const {tr} = useLanguage(); 
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
      const link = `/articles/${item._id}`
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} onClose={callbacks.closeModal}/>
    }, [callbacks.removeFromBasket]),
    toLink: useCallback((path) => {
      return navigate(path)
    }, [])
  };

  return (
    <ModalLayout title={tr('basket')} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
