<<<<<<< HEAD
import {memo, useCallback, useContext, useEffect} from 'react';
=======
import {memo, useCallback} from 'react';
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
<<<<<<< HEAD
import {useLanguage} from "../../language-provider";
import {useLocation} from "react-router-dom";

function Basket() {

  const { t } = useLanguage()

=======

function Basket() {

>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
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

<<<<<<< HEAD

  return (
    <ModalLayout title={t('basket')} onClose={callbacks.closeModal}>
=======
  return (
    <ModalLayout title='Корзина' onClose={callbacks.closeModal}>
>>>>>>> 965c1b144a06904160cffca15056d32ecb80f433
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);
