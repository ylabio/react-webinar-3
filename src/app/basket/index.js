import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import useLang from '../../i18n/use-lang';

function Basket() {

  const store = useStore();
  const {t} = useLang();

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
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} translate={t} onLinkClick={callbacks.closeModal}/>
    }, [callbacks.removeFromBasket, callbacks.closeModal]),
  };

  return (
    <ModalLayout title={t('cart')} onClose={callbacks.closeModal} closeText={t('close')}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} translate={t}/>
    </ModalLayout>
  );
}

export default memo(Basket);
