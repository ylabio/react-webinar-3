import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {getRoutePath} from "../../router/config";
import {useTranslate} from "../../i18n";

function Basket() {

  const store = useStore();
  const t = useTranslate();

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
    getRoutePath: useCallback((...args) => getRoutePath(...args), [])
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return (
        <ItemBasket
          item={item}
          onRemove={callbacks.removeFromBasket}
          getRoutePath={callbacks.getRoutePath}
          closeModal={callbacks.closeModal}
          removeButtonTitle={t('item-basket-remove-button-title')}
        />
      )
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout
      title={t('basket-title')}
      onClose={callbacks.closeModal}
      closeButtonTitle={t('basket-close-button-title')}
    >
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} totalTitle={t('basket-total-title')}/>
    </ModalLayout>
  );
}

export default memo(Basket);
